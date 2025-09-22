<template>
  <div class="aes-decrypt">
    <div class="input-group">
      <label>加密文本:</label>
      <textarea v-model="encryptedText" rows="4" placeholder="请输入AES加密的文本"></textarea>
    </div>

    <div class="input-group">
      <label>密钥 (Key):</label>
      <input type="text" v-model="key" placeholder="AES密钥">
    </div>

    <div class="input-group">
      <label>偏移量 (IV，可选):</label>
      <input type="text" v-model="iv" placeholder="AES偏移量">
    </div>

    <button @click="decrypt" class="decrypt-btn">解密</button>

    <div v-if="decryptedText" class="result">
      <label>解密结果:</label>
      <textarea v-model="decryptedText" rows="4" readonly></textarea>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
// 只引入必要的模块，减小体积
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import CryptoJS from 'crypto-js/core';

// 数据
const encryptedText = ref('7R+CSqAcl/OKRRCGxzZ1ig==');
const key = ref('WhatCannotBeSeen');
const iv = ref('TimeWaitForNoMan');
const decryptedText = ref('');

// 解密函数
const decrypt = () => {
  decryptedText.value = '';

  if (!encryptedText.value || !key.value) {
    alert('请输入加密文本和密钥');
    return;
  }

  // 准备密钥
  const keyBytes = Utf8.parse(key.value);

  // 解密配置
  const options = {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: Utf8.parse(iv.value)
  };

  // 执行解密
  const decrypted = AES.decrypt(encryptedText.value, keyBytes, options);

  // 转换为UTF8字符串
  decryptedText.value = decrypted.toString(Utf8);
};
</script>
<style lang="sass" scoped>
.aes-decrypt
  max-width: 600px
  margin: 20px auto
  padding: 20px
  border: 1px solid #e0e0e0
  border-radius: 8px
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)

.input-group
  margin-bottom: 16px

label
  display: block
  margin-bottom: 8px
  font-weight: 500
  color: #333

input, textarea
  width: 100%
  padding: 8px 12px
  border: 1px solid #ddd
  border-radius: 4px
  font-size: 14px

textarea
  resize: vertical

.decrypt-btn
  background-color: #42b983
  color: white
  border: none
  padding: 10px 20px
  border-radius: 4px
  cursor: pointer
  font-size: 16px
  transition: background-color 0.3s

  &:hover
    background-color: #359e75

.result
  margin-top: 20px
  padding-top: 16px
  border-top: 1px dashed #e0e0e0
</style>
