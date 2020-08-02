# Linux @高厉害

桌面环境：xfce

Shell：zsh

## 获取帮助

- man（Manual pages）用于调用手册页

  ```shell
  man <commandName>
  ```

- 查看不同区段的手册内容

  ```shell
  man {index} ls
  ```

  在 Research UNIX、BSD、OS X 和 Linux 中，手册通常被分为 8 个区段，安排如下：
  | 区段 | discription                               |
  | ---- | ----------------------------------------- |
  | 1    | 一般命令                                  |
  | 2    | 系统调用                                  |
  | 3    | 库函数，涵盖了 C 标准函数库               |
  | 4    | 特殊文件（通常是/dev 中的设备）和驱动程序 |
  | 5    | 文件格式和约定                            |
  | 6    | 游戏和屏保                                |
  | 7    | 杂项                                      |
  | 8    | 系统管理命令和守护进程                    |



- 手册中的快捷键

  -  `k，j（Enter）` 上下滚动，`Space`翻页
  - `/ + keywords` 搜索，`n` 切换至下一个匹配项，`Shift + n`切换至上一个匹配项

- 使用 info 可以查看更为详细的说明

  ```shell
  info <commendName>
  ```

- 使用 <commendName> --help 查看当前命令的帮助（大多数命令都带有这个参数）

  ```shell
  ls --help
  ```

## 文件操作

- 创建文件

  ```shell
  touch {fileName}
  ```

- 批量创建文件

  ```shell
  touch example{1..10}.extension
  
  # 这样会创建十个文件，依次为：
  example1.extension、example2.extension...example10.extension
  # 根据 ASCII 的索引进行创建
  ```

- 进入一个目录

  ```shell
  cd {pathName}
  ```

- 查看当前目录

  ```shell
  pwd
  ```

- 列出文件

  ```shell
  ls {pathName}
  ```

- 使用 Tab 补全

- 快捷键

    | description                                | key           |
    | ------------------------------------------ | ------------- |
    | 结束当前任务                               | Ctrl+c        |
    | 键盘输入结束或退出终端                     | Ctrl+d        |
    | 暂停当前程序，暂停后按下任意键恢复运行     | Ctrl+s        |
    | 将当前程序放到后台运行，恢复到前台为命令fg | Ctrl+z        |
    | 将光标移至输入行头，相当于Home键           | Ctrl+a        |
    | 将光标移至输入行末，相当于End键            | Ctrl+e        |
    | 删除从光标所在位置到行末                   | Ctrl+k        |
    | 向前删除一个单词                           | Alt+Backspace |
    | 将终端显示向上滚动                         | Shift+PgUp    |
    | 将终端显示向下滚动                         | Shift+PgDn    |
    | 显示历史输入                               | Up            |

- 通配符

    | key                | description                                        |
    | ------------------ | -------------------------------------------------- |
    | *                  | 匹配0 个或多个字符                                 |
    | ?                  | 匹配任意一个字符                                   |
    | [char1, char2...]  | 在列表中匹配任意单一字符（不能用于创建文件）       |
    | [^char1, char2...] | 匹配任意非该列表包含的单一字符（不能用于创建文件） |
    | [char1-char2]      | 匹配任意单一字符（不能用于创建文件）               |
    | {str1, str2...}    | 在集合中匹配一个字符串                             |
    | {str1...strn}      | 匹配字符串                                         |



## 用户管理

- who 命令

  ```shell
  # root
  who am i
  > username pts/0        2020-04-21 14:41 (:1.0)
  
  # root
  who mom likes
  > username pts/0        2020-04-21 14:41 (:1.0)
  
  # pre user
  whoami
  > username
  
  # root
  who -m
  > username pts/0        2020-04-21 14:41 (:1.0)
  ```
  
  | param | description                |
  | ----- | -------------------------- |
  | `-a`  | 打印能打印的全部           |
  | `-d`  | 打印死掉的进程             |
  | `-m`  | 同`am i`，`mom likes`      |
  | `-q`  | 打印当前登录用户数及用户名 |
  | `-u`  | 打印当前登录用户登录信息   |
  | `-r`  | 打印运行等级               |



- root 权限

  - root 账号是 Linux 系统的超级管理员账户，拥有操作系统的所有权限

  - sudo、su、su - 命令

    - 创建用户
  
      ```shell
      sudo adduser {username}
      ```

    - 切换用户
    
      ```shell
      su -l {username}
      su - {username}
      ```

   - 更改密码
  
    - 当前用户密码
  
       ```shell
       passwd
      ```
      
    - 更改其他用户密码（需要 root 权限）
    
      ```shell
      sudo passwd {username}
      ```


### 用户组

- 查看用户组

  - groups 命令
    ```shell
    groups {username}
    > {username}:{groupList}
    ```

  - 查看 `/etc/group ` 文件

    ```shell
    # cat 用于读取和输出指定文件，| sort 表示在输出前进行一次字典排序
    cat /etc/group | sort
    ```

    或

    ```shell
    # grep -E 用于过滤内容
    cat /etc/group | grep -E "string"
    ```

    group 文件的格式为：`group:pwd:GID:userList`

    当用户的 UID 与用户组的 GID 一致时，在 `/etc/group`文件中的`group:pwd:GID:`后不会显示该用户

    > GID：group ID
    > UID：user ID

- 将用户添加到用户组

  ```shell
  # -G 意为强制将 group 作为新主组
  sudo usermod -G {groupName} {username}
  ```

- 删除用户

  ```SHELL
  sudo deluser {username} --remove-home
  ```

- 删除用户组

  ```shell
  sudo delgroup {groupName}
  # 或者
  sudo groupdel {groupName}
  ```

- ###### adduser useradd / deluser userdel / delgroup groupdel ...

  动词在后的，如 useradd，像是一种比较精确的命令，如 useradd 就是添加用户，不会做任何其他操作，包括设置密码，创建工作目录等...

  而动词在前的，如 adduser，则会提示你并做一系列对该用户的初始化的操作。

### 文件权限

#### ls 命令

- 显示当前目录的所有文件

  ```shell
  ls -a
  # 显示完整属性
  ls -al
  ```

- 显示带单位的文件大小

  ```shell
  ls -asSh
  ```

  | param | description                           |
  | :---: | ------------------------------------- |
  |  -a   | all，显示当前目录所有文件             |
  |  -h   | human readable 以人类看得懂的方式呈现 |
  |  -s   | 显示文件大小                          |
  |  -S   | 以文件大小排序                        |
  |  -l   | 显示更多的格式信息                    |

---

#### 文件权限

- 文件信息

  `ls -l`输出的一条文件信息：
  从左到右依次为：
  文件类型和权限	链接数	所有者	所属用户组	文件大小	最后修改时间	文件名

  > -rw-r--r--   1 shiyanlou shiyanlou   1543 9\u6708  19  2019 package.json

- 文件类型和权限

  形如`drwxr-xr-x`的文件信息，包含 “文件类型” 和 “权限信息”

  理解时应该做如下拆解：

  从左到右依次为：
  
  文件类型、拥有者权限、所属用户组权限、其他用户权限
  
  权限信息包含：拥有者权限、所属用户组权限 和 其他用户权限
  
  **d**	**rwx**	**r-x**	**r-x**
  
  | 文件类型 | description |
  | :------: | ----------- |
  |    d     | 目录        |
  |    l     | 软连接      |
  |    b     | 块设备      |
  |    c     | 字符设备    |
  |    s     | socket      |
  |    p     | 管道        |
  |    -     | W普通文件   |
  
  权限信息三个为一组：
  
  | 权限信息 | description  |
  | :------: | ------------ |
  |    r     | read 读权限  |
  |    w     | write 写权限 |
  |    x     | 执行权限     |
  
  同时拥有一个目录的读权限（r）和执行权限（x）时才可以查看内部文件。
  
- 变更文件所有者

  ```shell
  sudo chown {username} {fileName}
  ```

- 修改文件权限

  - 法1. 数字表示

    将文件权限信息 **rwx** 与 **三个二进制数** 对应，如 111 代表 rwx， 010 代表 -w-

    同时十进制数 7 也可以表示 rwx，同理 -w- 可用十进制数 2 表示

    
    我们知道，权限信息由 拥有者权限、所属用户组权限 和 其他用户权限组成

    那么三种权限则可以由 **九个二进制数** 或 **一个小于 1024 的十进制数** 表示 

    例如 600 可表示 -rw-------，即仅拥有者（和超级管理员）可读写

    ```shell
    chmod {permission} {fileName}
    # e.g. chomd 600 privateFile.txt
    ```

  - 法2. u、g、o

    首先表示出需要更改的权限类型：

    u（user）拥有者权限

    g（group）所属用户组权限

    o（others）其他用户权限


    然后通过	+（添加）	-（删除）	来表示需要如何更改权限


​    
​    最后通过 rwx 来表示需要修改当前权限类型的何种权限
​    
​    ```shell
​    chmod {operation} {fileName}
​    # eq. chmod u+rwx privateFile.txt
​    ```


​    


## 临时记录

```shell
sudo apt-get update
sudo apt-get install {packageName}
```

三个包：`toilet` `figlet` `sysvbanner`

