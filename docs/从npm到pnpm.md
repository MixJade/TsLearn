# 从npm到pnpm

> 2025-04-16 10:15:37


### **一、安装 pnpm**
1. **全局安装 pnpm**（需 Node.js 14+，推荐使用最新 LTS 版本）：  
   ```bash
   npm install -g pnpm@latest
   ```
   
2. **验证安装**：  
   ```bash
   pnpm --version
   ```
   
3. **如果npm版本不够**，去Node.js官网重新下载安装一下，不要用命令行

### **二、迁移项目依赖**
1. **清理旧依赖文件**
   ```bash
   # 进入项目根目录
   cd your-project

   # 删除 npm 生成的文件
   rm -rf node_modules package-lock.json
   ```

2. **初始化 pnpm 环境**（可选）
   如果项目已有 `package.json`，pnpm 会直接读取，无需重新初始化。  

3. **安装依赖**

   ```bash
   pnpm install
   ```
   - 如果想设置依赖下载位置，见[项目依赖路径](#### 项目依赖路径)，不然默认安装到全局仓库
   
4. **安装最新依赖**

   ```bash
   pnpm update --latest
   ```


### **三、更新包管理命令**
1. **修改脚本命令**（可选）：
   在 `package.json` 中，将 `npm run` 替换为 `pnpm run`，或保持不变（pnpm 兼容 npm 脚本命令）：  
   
   ```json
   {
     "scripts": {
       "start": "pnpm run dev", // 显式使用 pnpm
       "dev": "vite",
       "build": "vite build"
     }
   }
   ```
   
2. **常用命令替换对照表**：  
   | npm 命令          | pnpm 命令          | 说明                          |
   |-------------------|-------------------|-------------------------------|
   | `npm install`     | `pnpm install`    | 安装所有依赖                  |
   | `npm install pkg` | `pnpm add pkg`     | 添加依赖（默认最新版本）      |
   | `npm install -D pkg` | `pnpm add -D pkg` | 添加开发依赖                  |
   | `npm uninstall pkg` | `pnpm remove pkg` | 删除依赖                      |
   | `npm run script`  | `pnpm run script` | 运行脚本（完全兼容）          |


### **四、处理特殊场景**
   - 若遇到 `peerDependency` 错误，pnpm 会提示具体缺失的依赖，按提示安装即可：  
     ```bash
     pnpm add [缺失的依赖名]
     ```
   - 如需强制安装特定版本（与 npm 语法一致）：  
     ```bash
     pnpm add pkg@1.0.0
	```


### **五、验证迁移结果**
1. **检查依赖结构**：  
   - `node_modules` 目录体积应明显减小（因硬链接机制）。  
   - 根目录存在 `pnpm-lock.yaml`，无 `package-lock.json`。

2. **运行项目**：  
   ```bash
   pnpm run dev
   ```
   确保项目正常启动，无依赖缺失或版本冲突错误。

### 六、默认依赖路径

#### 全局存储路径
pnpm 使用全局存储来存储所有已安装包的文件，以节省磁盘空间。在不同操作系统中，默认的全局存储路径如下：
- **Linux 和 macOS**：`~/.local/share/pnpm/store`
- **Windows**：`%LOCALAPPDATA%\pnpm\store`

#### 项目依赖路径
若要把 `pnpm` 下载的依赖位置设定为当前项目上级目录下的 `pnpm_repo`，你可以通过修改 `pnpm` 的配置文件达成这一目的。具体步骤如下：

##### 1. 创建或编辑 `.npmrc` 文件
在当前项目的根目录下，若没有 `.npmrc` 文件，就创建一个；若已有，则直接编辑它。

##### 2. 添加配置项
在 `.npmrc` 文件里添加如下配置：
```plaintext
store-dir = ../pnpm_repo
```

##### 3. 完整示例
假设你有一个项目结构如下：
```plaintext
parent_directory/
├── pnpm_repo/
└── my_project/
    └── .npmrc
```

在 `my_project` 目录下的 `.npmrc` 文件中添加上述配置。

##### 4. 验证配置
在 `my_project` 目录下运行 `pnpm install` 命令，`pnpm` 就会把依赖下载到 `../pnpm_repo` 目录中。

##### 5. 注意事项
- 要保证 `../pnpm_repo` 目录有足够的权限让 `pnpm` 写入文件。
- 若你使用的是不同的工作区，要保证每个工作区的 `.npmrc` 文件都进行了相应配置。 