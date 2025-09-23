import CryptoJS from 'crypto-js/core';

// 常量定义
const cSharpHeader: Uint8Array<ArrayBuffer> = new Uint8Array([0, 1, 0, 0, 0, 255, 255, 255, 255, 1, 0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 0]);
const aesKey = CryptoJS.enc.Utf8.parse('UKu52ePUBwetZ9wNX88o54dnfKRu0T1l');

/**
 * 移除头部信息
 * @param bytesData 输入的字节数据
 * @returns 处理后的字节数据
 */
function removeHeader(bytesData: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> {
    // 移除固定头部和结尾的11
    let data = bytesData.slice(cSharpHeader.length, bytesData.length - 1);
    // 移除长度前缀
    let lengthCount = 0;
    for (let i = 0; i < 5; i++) {
        lengthCount++;
        if ((data[i] & 0x80) === 0) {
            break;
        }
    }
    return data.slice(lengthCount);
}

/**
 * AES ECB模式解密（移除PKCS7填充）
 * @param ciphertext 加密的字节数据
 * @returns 解密后的字节数据
 */
function aesDecrypt(ciphertext: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> {
    // 将Uint8Array转换为CryptoJS的WordArray
    const wordArray = CryptoJS.lib.WordArray.create(ciphertext);
    // 解密（ECB模式，PKCS7填充）
    const decrypted = CryptoJS.AES.decrypt(
        {
            ciphertext: wordArray,
            format: CryptoJS.format.Hex  // 明确指定格式
        } as unknown as CryptoJS.lib.CipherParams, // 使用unknown，缺少属性的不重要
        aesKey,
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }
    );
    // 将解密结果转换为Uint8Array
    return new Uint8Array(decrypted.toString(CryptoJS.enc.Latin1).split('').map(c => c.charCodeAt(0)));
}

/**
 * 完整解码流程：去头部 -> Base64解码 -> AES解密 -> 转字符串
 * @param bytesData 输入的字节数据
 * @returns 解码后的字符串
 */
function decode(bytesData: Uint8Array<ArrayBuffer>): string {
    // 移除头部
    let data = removeHeader(bytesData);
    // Base64解码
    const base64Str = new TextDecoder('latin1').decode(data);
    const base64Decoded = CryptoJS.enc.Base64.parse(base64Str);
    const base64Bytes = new Uint8Array(base64Decoded.sigBytes);
    for (let i = 0; i < base64Decoded.sigBytes; i++) {
        base64Bytes[i] = (base64Decoded.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }
    // AES解密
    const decryptedBytes = aesDecrypt(base64Bytes);
    // 转换为UTF-8字符串
    return new TextDecoder('utf-8').decode(decryptedBytes);
}

export {decode};