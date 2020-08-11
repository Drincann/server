# Git

## 常用命令

| command                                   | desc                                                         |
| ----------------------------------------- | ------------------------------------------------------------ |
| `cd  {dir}`                               | change directory 切换目录                                    |
| `pwd`                                     | print working directory 打印工作目录，即当前路径             |
| `ls`                                      | list 列出当前目录的所有文件，可选参数`-ah`显示隐藏的目录     |
| `mkdir {dir}`                             | make director 创建一个目录                                   |
| `touch {filename}`                        | 新建一个文件                                                 |
| `cat {filename}`                          | 查看一个文本文件的内容                                       |
| `rm {filename/dir}`                       | 删除文件/目录，可选参数`-r`(recusive)递归删除                |
| `mv {filename/dir} src {target}`          | 移动文件，从 {filename/dir} 移动到 {target}                  |
| `reset`/`clear`                           | 清屏                                                         |
| `vi {filename}`                           | 使用 vim 查看和修改文件内容                                  |
|                                           |                                                              |
| `git add`                                 | 添加文件到暂存区，可选参数`-f`强制添加（被忽略的文件）       |
| `git commit`                              | 提交文件到仓库，可选参数`-m`后跟描述文本                     |
| `git log`                                 | 查看提交日志，可选参数`--pretty=oneline`简化输出，可选参数`--graph`查看分支合并情况，可选参数`--abbrev-commit`显示简化的`commit id`，可选参数`-{number}`显示最近`{number}`个提交 |
| `git reflog`                              | 查看每一次动作的记录                                         |
| `git reset`                               | 参数`--hard`后跟`commit id`或`HEAD`指示回滚版本，例如`git reset --hard HEAD^`。或`git reset HEAD -- {filename}`用来放弃暂存区的文件`{fliename}`，即将该文件退回到工作区 |
| `git clean`                               | 清空未被`track`过的文件，必选参数`-d`/`-f`/`-n`/`-x`，分别表示删除文件夹、删除文件、预删除（列出将要删除的文件）、强制删除。例如：`git clean -df`，`git clean -n`... |
| `git checkout -- {filename}`              | 放弃工作区文件`{filename}`的修改，即将文件`filename`回滚到暂存区的版本，如果暂存区没有，则回滚到上一次提交的版本 |
| `git restore {fliename}`                  | 放弃工作区文件`{filename}`的修改，在新版本中用来代替`git checkout`。可选参数`--staged`用来退回暂存区的文件，例如`git restore --staged {filename}`，在新版本中用来代替`git reset HEAD -- {filename}`。 |
| `git status`                              | 查看状态                                                     |
| `git diff {version} -- {filename}`        | 查看版本 `{version}` 中的文件 {filename] 与 `{filename}` 差异 |
| `git remote add {name} {respository}`     | 添加名称为`{name}`的远程仓库`{respository}`                  |
| `git push {origin} {branch}`              | 推送对应分支到远程仓库`{origin}`的`{branch}`分支，第一次推送可以加一个`-u`参数，表示关联本地与远程的分支，例如`git push -u master` |
| `git clone {respository}`                 | 从远程仓库`{respository}`拉取内容到本地                      |
| `git branch {branch}`                     | 创建一个分支 `{branch}`，可选参数`-d`意为删除分支`{branch}`，可选参数`-D`表示强制删除 |
| `git branch`                              | 查看分支                                                     |
| `git checkout {branch}`                   | 切换到分支`{branch}`，可选参数`-b`表示创建并切换，例如：`git checkout -b dev` |
| `git switch {branch}`                     | 切换到分支`{branch}`，可选参数`-c`表示创建并切换，例如：`git switch -c dev` |
| `git merge {branch}`                      | 将分支`{branch}`合并到当前分支，可选参数`--no-ff`禁用快速合并，后跟`-m`记录合并 |
| `git stash`                               | 保存开发现场                                                 |
| `git stash list`                          | 查看保存的开发现场列表，最近的开发现场会排在上边             |
| `git stash apply`                         | 恢复第一个开发现场                                           |
| `git stash apply {stash}`                 | 恢复指定的工作区`{stash}`                                    |
| `git stash drop`                          | 删除第一个开发现场                                           |
| `git stash pop`                           | 恢复第一个开发现场并删除                                     |
| `git cherry-pick {commit}`                | 将一次`{commit}`应用到当前分支                               |
| `git remote`                              | 查看远程仓库，可选参数`-v`显示详细信息                       |
| `git pull`                                | 从远程仓库拉取数据                                           |
| `git rebase`                              | 改变提交节点，清理提交历史。                                 |
| `git tag {tagName} {commitId}`            | 对某次提交后的版本库`{commit id}`（缺省表示当前版本库）打一个标签`{tagName}`，可选参数`-m`指定说明信息，同时`-a`指定标签名，可选参数`-d`表示删除标签 |
| `git tag`                                 | 显示所有`tag`                                                |
| `git show {tagName}`                      | 显示某个 tag `{tagName}`的详细信息                           |
| `git push origin {tagName}`               | 推送某个`tag`到远程仓库，可选参数`--tags`表示推送所有未推送的标签到远程仓库，例如：`git push origin --tags`，可选参数`--delete`用来删除远程仓库的某个标签 |
| `git push origin {loacalTag}:{originTag}` | 将本地`tag` `{localTag}`推送到远程`tag` `{originTag}`，常用来删除标签，例如`git push origin :refs/tags/v.1` |
| `git check-ignore {filename}`             | 检查`.gitignore`中的规则与`{filename}`的匹配情况             |



## 开始使用 Git

### Git 的发展

2005 年，在 BitMover 威胁收回 Linux 社区的免费使用权后，Linus 花了两周时间自己用 C 写了一个分布式版本控制系统 —— Git。

2008 年，GitHub 上线，它为开源项目免费提供 Git 存储。



### 分布式版本控制系统

Git 是”分布式版本控制系统“，与之相对应的称为“集中式版本控制系统”，例如 CVS、SVN。

集中式版本控制系统之所以被称为集中式，是因为这种系统存在一个中央服务器，代码集中储存在这个服务器上。拉下代码干活，干完活再推上去。

分布式版本控制系统没有中央服务器，每个用户的电脑上都有完整的版本库。团队协作可以通过互相推送代码来完成，但实际上这样很麻烦。一般来说即便是分布式，也有一台电脑来充当中央服务器的角色，方便大家对代码的修改和交换。



### Git 下载

[Git 官网下载页](https://git-scm.com/downloads)



### 设置个人信息

打开`Git Bash`，设置用户名称及邮箱：

```bash
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

参数`--global`表示对所有仓库使用该配置。



### 创建仓库（版本库）

将当前目录作为一个仓库：

```bash
$ git init
```

> Initialized empty Git repository in B:/workspace/Git/learnGit/.git/

此时该目录下就会出现一个隐藏目录`.git`，该目录被称为“版本库”。



### 添加文件

#### 创建文件

注意，Git 仅可以跟踪文本文件的改动，其他二进制文件虽然可以管理，但无法跟踪改动。

向仓库添加文件，可以通过手动创建的方式，也可以通过 Git Bash 提供的编辑器 vim 来完成：

首先创建一个文件：

```bash
$ touch README.md
```

修改该文件：

```bash
$ vi README.md
```

进入 vim 后，可以直接编辑，如果不能，那么点击 `i` 可以进入插入模式，然后就可以正常编辑了。

保存并退出需要先点击 `esc` 进入命令模式，然后输入 `:wq` 回车。

---

#### 提交`commit`

1. 把文件添加到仓库`git add`：

   ```bash
   $ git add README.md
   ```

2. 把文件提交到仓库`git commit`：

   ```bash
   $ git commit -m "add README.md"
   ```

   `-m`后跟的是提交的说明文本。

---

#### 跨平台的问题

第一步操作`git add`时可能会出现警告：

> warning: LF will be replaced by CRLF in README.md.
>
> The file will have its original line endings in your working directory

意思是，在 README.md 中，LF 将被 CRLF 替换。

> 以下内容参考 [简书的这篇文章](https://www.jianshu.com/p/450cd21b36a4)

CR/LF是不同操作系统上使用的换行符：[CR](https://link.jianshu.com/?t=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCarriage_return)（**C**arriage**R**eturn），[LF](https://link.jianshu.com/?t=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLine_feed)（**L**ine**F**eed）

不同平台对换行的处理不同，这回会对跨平台协作造成麻烦。

Dos 和 Windows平台： 使用回车（CR）和换行（LF）两个字符来结束一行，回车+换行(CR+LF)，即“\r\n”。

Mac 和 Linux平台：只使用换行（LF）一个字符来结束一行，即 "\n"。

在 win 平台，为了应对这种麻烦事，Git 可以在我们提交代码时将 "\r\n" 替换为 "\n"，而在检出时将 "\n" 替换为 "\r\n"。

这项设置是`core.autocrlf`，在 win 平台的默认值是`true`。

```bash
$ git config --global core.autocrlf true
```

如果不涉及跨平台协作，那么可以将该项置`false`，此时便不再进行替换，也不会有警告了：

```bash
$ git config --global core.autocrlf false
```

---





## 版本管理

### 回滚版本

#### 打印日志

我们可以通过`git log`查看提交日志：（按 Q 可退出）

可以选择`--pretty=oneline`参数对输出进行简化。

```bash
$ git log --pretty=oneline
```

> 4b827acd29cfa37b49c2aa99e72fea51240d9a4c (HEAD -> master) change 2
>
> 91d4e37e2873df12c147ae1eb45a1548a5eed7fd append change 1
>
> 173b666ffd0e89c7a867506d6d86363e19ebb5af add README.md

(HEAD -> master)，`HEAD`意为当前版本，当前版本位于 change 1 这条描述的提交。

而前面一长串字母加数字字符串被称为`commit id`，即版本号，是通过 SHA1 计算出来的。

---

#### 版本回退

通过`git reset`进行版本回退：

```bash
$ git reset --hard HEAD^
```

`HEAD`意为“当前版本”。

`HEAD^`意为“上一个版本”

`HEAD^^^`意为“上 3 个版本”

`HEAD~20`意为“上 20 个版本”。

**注意！`git reset --hard`不会影响未被`track`过的文件及文件夹**

想要将未被`track`过的文件清空，完全退回到某一次`commit`，需要使用`git clean -df`。

删除所有未被`track`过的中的文件`git clean`：

```bash
$ git clean -df
```

`-d`表示删除文件夹，`-f`表示删除文件。

`git clean`经常与`git reset --hard`一起使用，前者用来清理未被`track`过的文件及文件夹，后者用来清理已被`track`过的文件及文件夹。

---

#### 恢复到指定版本

此时通过`git log`已经看不到回退前的版本了。

如果想要前进到某个版本，需要找到之前提到的`commit id`：

```bash
$ git reset --hard 4b827
```

输入前几位即可（但必须保证能够指向唯一的一个版本），Git 会自动匹配。

但是这里有一个问题，`git log`已经看不到新版本的`commit id`了，怎么办呢？

我们可以在还未关闭的 Git Bash 中手动上翻来查找。

但是除此之外，我们还可以通过`git reflog`命令来查看自己的每一次动作。

```bash
$ git reflog
```

> 173b666 HEAD@{4}: reset: moving to HEAD^^
>
> 4b827ac (HEAD -> master) HEAD@{5}: commit: change 2
>
> 91d4e37 HEAD@{6}: commit: append change 1
>
> 173b666 HEAD@{7}: commit (initial): add README.md

最前边的就是`commit id`。



### 工作区和暂存区

工作区指的是仓库主目录，而暂存区则是通过`git add`将文件添加到的地方。

![工作区和版本库](https://www.liaoxuefeng.com/files/attachments/919020037470528/0)

`git add`用于将工作区的文件放到暂存区(stage)，`git commit`用于将暂存区的内容一次性提交到一个分支（Git 会自动为我们创建一个分支`master`）。

![工作区和暂存区](https://www.liaoxuefeng.com/files/attachments/919020100829536/0)

我们修改一下`README.md`的内容并提交，然后创建一个文件`LICENSE.md`随意写一些内容。

介绍一个命令`git status`用来查看状态：

```bash
$ git status
```

> On branch master
>
> Changes to be committed:
>
>   (use "git restore --staged <file>..." to unstage)
>
> ​        modified:   README.md
>
> 
>
> Untracked files:
>
>   (use "git add <file>..." to include in what will be committed)
>
> ​        LICENSE.md

下面我们使用`git add LICENSE.md`将`LICENSE.md`添加到暂存区。然后再次查看状态：

> On branch master
>
> Changes to be committed:
>
>   (use "git restore --staged <file>..." to unstage)
>
> ​        new file:   LICENSE.md
>
> ​        modified:   README.md

通过`git commit`提交后再次查看状态：

> On branch master
>
> nothing to commit, working tree clean

注意，每次修改后，如果不用 `git add`将其放置到暂存区，那么最后一次修改就不会被提交。

也就是说，Git 跟踪的不是文件，而是修改。

再介绍一个命令`git diff`查看文件差异：

```bash
$ git diff HEAD -- README.md
```

查看当前版本与工作区`README.md`文件的差异。

> diff --git a/README.md b/README.md
>
> index e319675..f41a57f 100644
>
> --- a/README.md
>
> +++ b/README.md
>
> @@ -5,3 +5,7 @@
>
> \#\# 修改 2
>
> 
>
> \#\# change 3
>
> +
>
> +\#\# change 4
>
> +
>
> +



### 撤销修改

#### 放弃工作区的修改

撤销修改`git checkout`：

```bash
$ git checkout -- READMA.md
```

将文件`README.md`回退到`git add`/`git commit`时的状态，若已添加到暂存区，则优先回退到暂存区的状态。

实际上是用版本库的版本替换工作区的版本。

---

#### 时间节点

这里可以解释一下，Git 的提交有两个时间节点，一个是`git add`存放到暂存区，一个是`git commit`存放到版本库。

`commit`通常是一个比较大的改动，在此之前，我们可以通过`add`将暂存区做一个缓冲。

在迭代的过程中，我们的工作区要与缓冲区进行交互，当迭代结束，再全部`commit`到版本库。

这就是`checkout`优先退回到暂存区的状态的原因。

---

#### 放弃暂存区的修改

如果已经`git add`，想要回退到上一次`commit`的状态，可以这样做：

将暂存区文件退回（unstage）到工作区`git reset`（`git reset`的另一种用法）：

```bash
$ git reset HEAD -- README.md
```

这时候暂存区已经没有这次修改了。

然后直接`git checkout`撤销自上一次`commit`以来的所有修改。

---

#### 推荐使用`restore`

在新版本中，Git 提供了统一的命令`git restore`：

撤销修改：

```bash
$ git restore {filename}
```

退回暂存区的文件：

```bash
$ git restore --staged {filename}
```



### 删除文件

#### 方法一

直接在版本库删除文件`git rm`：

```bash
$ git rm test
```

这次修改会被直接添加到暂存区，这时直接`git commit`即可。

```bash
$ git commit -m "..."
```

---

#### 方法二

还可以这样做：

先手动在文件系统中删除`rm`：

```bash
$ rm test
```

然后将这次修改添加到暂存区`git add`：

```bash
$ git add test
```

最后`git commit`：

```bash
$ git commit -m "..."
```





## 远程仓库

### 推送到 GitHub

现在可以开始将本地仓库推送到远程仓库了，比如 GitHub。

我们首先在 GitHub 上创建一个仓库，就可以拿到一个基于 SSH 协议的地址。

例如：`git@github.com:GAOSILIHAI/learnGit.git`

然后可以通过`git remote add {name} {SSH://...}`进行远程仓库的添加：

```bash
$ git remote add origin  git@github.com:michaelliao/learngit.git
```

{name} 可以改成别的，不必一定是 origin。

这时候我们可以进行本地库向远程库的推送`git push {origin} {branch}`：

```bash
$ git push -u origin master
```

表示将当前分支推送到远程仓库 origin 的 master 分支。

`-u`意为同时将当前分支与远程 master 分支关联，以后再次推动的时候使用`git push`即可。



### SSH 秘钥

#### 使用 SSH 协议连接到 GitHub

如果是第一次使用 GitHub，这时候肯定会出错。当我们 push 的时候会出现：

> fatal: Could not read from remote repository.
>
> 
>
> Please make sure you have the correct access rights and the repository exists.

这是肯定的，我们没有设置任何内容来证明自己是 GitHub 仓库拥有者，如果推送成功才是出问题了。

GitHub 支持多种协议，但是最常用的还是 SSH。

除 SSH 外还有一个很熟悉的 https 协议，但使用这种协议推送很麻烦，每次都需要手动输入一遍密码。

想要使用 SSH 协议，可以参考 → [GitHub 文档 → 使用 SSH 连接到 GitHub](https://docs.github.com/cn/github/authenticating-to-github/connecting-to-github-with-ssh)。

这里简单说一下。

----

#### 创建 SSH 秘钥

首先在本地生成 SSH 秘钥，在终端输入：

```bash
$ ssh-keygen -t rsa -b 4096 -C {email}
```

{email} 替换成自己的邮箱（实际上可以是任意字符串）。然后一路按回车过去。

不出意外，秘钥已经生成好了，路径应该在用户目录下的 .ssh 下`~/.ssh/`：

```bash
$ ls ~/.ssh/
```

> id_rsa  id_rsa.pub  known_hosts

`id_rsa `是私钥，不用管。这时 Git 会自动帮你在本地关联私钥。

` id_rsa.pub`是公钥，需要与我们的 GitHub 账号关联。

我们可以通过文本编辑器查看公钥的内容，也可以通过`cat`命令：

```bash
$ cat ~/.ssh/id_rsa.pub
```

> ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDQLpHFPn1l4o+MWcYU03ECKZiOXY0gwo1NehENJSta/G7HHpne3D/BKjbh1LhJMY2I1GaDrmSn+e47T3+6oDNV7vYWVto46F0Ca5jMBEqrGci3L983pmsl8Z8b0FBJ5OZjKCR0qitllTwanyoYXDb7f7lXe1lBVS/JTCIRsH5d/CoZi8n0+ynMg3Dpen6N2cyz/NKnylRUq9YnzPF2voUIKNtyBxVVKypKzyvfKOLOI1nAQewoAJ1Ou+lrhpD41RwvjqLjmUATKqx16llo8oC417D4O90qNqF+ZgN2et1kV4ntk/IG/qaJR1rMG22mXh2WD4msf1hAys6XwbM4M8h7IH9//rkwQXhS8uAj8IQVzXR5Va+br6a3DpHgV02QfgrucKqJiIdvSWY0wn3ulZmhfH1Wg1UBV8FXZo2mH3M2mDixLDVsJSKmU0HcnHw6Fs1J63T+bJUzgKBERKr2GNVLVqMdOvtVhiat2ufAri8Ndl5Uv+gnPc65TCqKrHRb2cc= GAOSILIHAI

公钥可以随便拿给别人看，这是对方认证我们的手段。

---

#### 在 GitHub 关联公钥

进入 GitHub，进入 Setting，选择 SSH and GPG keys，点击 New SSH key。

然后在下方 Key 栏中把这一大串字符粘贴进去。另一个 Title 用于自己分辨不同的 SSH 关联，因为我们可能有多台电脑。

这时候就可以推送代码了。

---

#### 在本地关联私钥（选）

还有一种情况，如果我曾经在本地生成过 SSH 秘钥，GitHub 也关联了公钥，而我的 Git 重装了。

这时候我们需要手动关联私钥：

```bash
$ ssh-add ~/.ssh/id_rsa
```

如果出错，那么在关联私钥之前，我们要首先运行`ssh-agent`：

```bash
$ ssh-agent bash
```

然后再关联公钥即可。

---

#### 其他

可以通过`ssh -T git@github.com`检查关联结果。

当我们第一次使用 SSH 连接 GitHub 时，会出现警告，需要我们确认 SSH key fingerprints （SSH 密钥指纹）是否正确，可以信任。

这时只需要输入`yes`并回车即可。

关于 GitHub 的秘钥指纹，可以查阅 GitHub's SSH key fingerprints → [GitHub 文档 → GitHub's SSH key fingerprints](https://docs.github.com/en/github/authenticating-to-github/githubs-ssh-key-fingerprints)



### 从远程库克隆

从远程仓库克隆`git clone {respository}`：

```bash
$ git clone git@github.com:GAOSILIHAI/test.git
```

即可将远程仓库的文件克隆到当前工作目录。





## 分支管理

### 创建与合并分支

分支就是指针，指向`commit`的时间线上的某一个版本。

合并分支就是将一个指针指向另一个指针指向的地方。

创建一个分支`git branch {branch}`：

```bash
$ git branch dev
```

切换到该分支`git checkout {branch}`：

```bash
$ git checkout dev
```

前面提到过`git checkout -- {filename}`是将文件回滚版本。如果不加`--`，就是切换分支。

为了防止混淆，我们可以使用`git switch {branch}`来切换分支：

```bash
$ git switch dev
```

实际上这两步操作可以一次性完成`git checkout -b {branch}`/`git switch -c {branch}`：

```bash
$ git checkout -b dev
```

或

```bash
$ git switch -c dev
```

参数`-b`/`-c`表示创建并切换。

查看分支情况`git branch`，它会列出所有分支并指示出当前分支：

```bash
$ git branch
```

现在我们位于`dev`分支上。

添加一个文件`dev.md`，内容写上`# dev`，然后`add`并`commit`。

![](https://www.liaoxuefeng.com/files/attachments/919022387118368/l)

现在切换回`master`分支就可以发现 —— `dev.md`不见了，因为他在`dev`分支上。

![](https://www.liaoxuefeng.com/files/attachments/919022533080576/0)

下面进行分支合并`git merge {branch}`：

```bash
$ git merge dev
```

![git-br-ff-merge](https://www.liaoxuefeng.com/files/attachments/919022412005504/0)

合并成功，用于开发的分支也没必要存在了，删除`git branch -d {branch}`：

```bash
$ git branch -d dev
```

![git-br-rm](https://www.liaoxuefeng.com/files/attachments/919022479428512/0)

另外，若当前分支没有被合并，在删除该分支时会收到警告，提示该分支没有被完全合并。如果执意删除，可以使用`git branch -D dev`强制删除。



### 合并冲突

刚才是单线开发，创建一个新分支`dev`，开发完成后切回`master`合并。

下面用一个新的分支`fature1`举例。

在我开发`fature1`时，很有可能`master`也被改变了，改变的地方可能恰巧就是我正在开发的部分。

那么当我回去合并分支时，一定会产生冲突。

![git-br-feature1](https://www.liaoxuefeng.com/files/attachments/919023000423040/0)

当我们试图使用`git merge`合并分支时，Git 提醒我们冲突了，必须手动解决冲突，然后在提交。

> Auto-merging README.md
>
> CONFLICT (content): Merge conflict in feature1.md
>
> Automatic merge failed; fix conflicts and then commit the result.

此时，指示分支的`(master)`也变成了`(master|MERGING)`，提示当前分支正在处理合并中。

使用`git status`可以查看冲突的文件：

> On branch master
>
> Your branch is ahead of 'origin/master' by 1 commit.
>
>   (use "git push" to publish your local commits)
>
> 
>
> You have unmerged paths.
>
>   (fix conflicts and run "git commit")
>
>   (use "git merge --abort" to abort the merge)
>
> 
>
> Unmerged paths:
>
>   (use "git add \<file\>..." to mark resolution)
>
> ​        both modified:      README.md
>
> 
>
> no changes added to commit (use "git add" and/or "git commit -a")

查看冲突的文件：

> <<<<<<< HEAD
>
> 
>
> \# content - master
>
> \=\=\=\=\=\=\=
>
> \# content - feature1
>
> \>>>>>>> feature1

Git 通过等号和大于小于号来指示冲突内容，这时候我们需要手动修改。

修改后进行`add`和`commit`，此时就合并成功了。

![git-br-conflict-merged](https://www.liaoxuefeng.com/files/attachments/919023031831104/0)

此时可以利用`git log --graph --pretty=oneline --abbrev-commit`查看分支合并情况：

> \*   f144e47 (HEAD -> master) merge feature1
>
> |\
>
> | * 8f867d4 modify README.md feature
>
> \* | 1f5ffe0 modify README.md master
>
> |/



### 留下合并的信息

分支合并是有不同模式的，例如未发生冲突的合并称为`Fast forward`，合并时 Git 会告诉我们。

日志不会记录`Fast forward`合并，但是会记录分支的`commit`，但当删除分支后，这个`commit`也不再带有该分支的信息。

如果想要从日志上了解到每次合并，则需要在合并是使用`--no-ff`参数禁用`Fast forward`合并。

```bash
$ git merge --no-ff -m "merge with no-ff" dev
```

当使用了这个参数后，Git 会额外生成一个`commit`，这就像我们解决冲突时最后的那个`commit`一样，只不过这次不用解决冲突。

此时便可以在日志中看到这次合并的信息，以后看到这里就知道此处做过合并。



### 多分支开发策略

#### 使用`stash`保存开发现场

对于每个分支来说，工作区都是相同的。

那么当我们正在分支`task1`开发任务 1 时突然收到了更紧急的任务 2 该怎么办？肯定要创建分支。

然后我们创建切换到了一个新的分支`task2`，然而工作区还在`task1`的现场，怎么办？

使用`git stash`保存当前工作区：

```bash
$ git stash
```

此时工作区就是 clean 的，恢复到了 HEAD 版本，不过之前的工作区已经存起来了。

通过`git stash list`查看：

```bash
$ git stash list
```

工作完成后，恢复最近的工作区`git stash apply`：

```bash
$ git stash apply
```

如果用不到了，需要手动删除，删除最近保存的工作区`git stash drop`：

```bash
$ git stash drop
```

也可以直接恢复后自动删除工作区`git stash pop`；

```bash
$ git stash pop
```

可以多次保存工作区，最新的工作区会排在列表的上方。

可以指定恢复某个工作区：

```bash
$ git stash apply stash@{1}
```

注意，多次恢复工作区会并不是重新载入工作区，而是不断地向工作区添加新修改。为了避免这样的问题，可以先`git reset --hard HEAD`将工作区恢复到上一次提交，然后再从`stash`恢复工作区。

---

#### 将某个`commit`合并到当前分支

再设想一下，`task2`是`master`的分支，很可能`task1`也需要进行同样的修改。

我们当然可以在`task2`结束后，回到`task1`再重复操作一遍，但实际上还有更简单的方法。

我们只需要将`task2`的`commit`复制一份应用到`task1`即可。假设`task2`的这个`commit id`为 `1a2b3c4d`。

Git 提供了一个命令`git cherry-pick`：

```bash
$ git cherry-pick 1a2b3c4d
```

然后该`commit`就会被应用到当前分支了。





## 协作开发

### 拉取数据

#### 克隆仓库

```bash
git clone ...
```

---

#### 切换分支

从远程仓库克隆后，默认情况下仅显示`master`分支，若想切换到其他分支，直接`switch/checkout`即可，Git 会自动寻找到指定分支的远程引用。

```bash
$ git switch dev
```

然后就可以在本地`commit`并`push`代码了。

---

#### 解决冲突

如果在我们`push`之前，另一个人也`push`了相关的代码， 这就发生了冲突。

Git 会提示：

> To github.com:GAOSILIHAI/learnGit.git
>
>  ! [rejected]        dev -> dev (fetch first)
>
> error: failed to push some refs to 'github.com:GAOSILIHAI/learnGit.git'
>
> hint: Updates were rejected because the remote contains work that you do
>
> hint: not have locally. This is usually caused by another repository pushing
>
> hint: to the same ref. You may want to first integrate the remote changes
>
> hint: (e.g., 'git pull ...') before pushing again.
>
> hint: See the 'Note about fast-forwards' in 'git push --help' for details.

这时候我们需要拉取最新代码到本地，合并冲突，然后`push`。

---

#### 拉取数据

`git pull`命令可以从远程仓库拉取数据，即更新本地仓库：

```bash
$ git pull
```

拉取完成后，如果本地与远程存在冲突，则直接进入`MERGING`状态。

然后手动解决冲突并`commit`，`push`代码即可。



### 整理提交历史

通过刚才的方法解决了冲突，我们看一下日志：

> \*   e32b583 (HEAD -> dev) Merge file1 & file2
>
> |\
>
> | \* 8c68847 (origin/dev) add file1
>
> \* | 8b009cd add file2
>
> |/

实际上这两条`commit`互不影响，但他仍然记录为一次合并，很不直观，也不好看。

使用`git rebase`重新设定提交起点：

```bash
$ git rebase
```

然后再看一下日志：

> \* f224cd1 (HEAD -> dev) add file2
>
> \* 8c68847 (origin/dev) add file1

合并操作消失了，而且提交记录变成一条直线了！

`git rebase`本意是改变提交起点，用来对本地的提交历史进行整理，将本地提交基于的版本库改变为尽可能新的版本库，然后自动重新进行`commit`，将拉取代码时的合并操作进行简化。





## 标签管理

### 创建标签

标签`tag`是一个指针，指向某个`commit`。可以将他看做是某个版本库的一个别名，方便记忆。

例如，使用`git tag {tagName}`给当前版本库打一个标签：

```bash
$ git tag v0.1
```

可选参数`-d`表示删除`tag`：

```bash
$ git tag -d v0.1
```

可选参数`-m`指定说明文字，同时使用参数`-a`指定标签名：

```bash
$ git tag -a v0.1 -m "version 0.1 debug"
```

后跟一个`commit id`指定某个`commit`后的版本库，缺省表示当前版本库。

使用`git tag`查看所有`tag`（字母排序）：

```bash
$ git tag
```

使用`git show {tagName}`查看某个`tag`的详细信息：

```bash
$ git show v0.1
```

### 推送到远程仓库

使用`git push origin {tagName}`将某个`tag`推送到远程：

```bash
$ git push origin refs/tags/v.1
```

想删除远程仓库的标签可以使用参数`--delete`，例如：

```bash
$ git push origin --delete refs/tags/v.1
```

还可以使用`git push origin {localTag}:{originTag}`：

```bash
$ git push origin :refs/tags/v.1
```

表示将空标签推送到远程的指定标签，达到的效果就是删除。

为了防止误删分支，使用`refs/tags/{tagName}`指定`tag`。





## 其他

### 忽略文件

Git 有三种文件，第一个是被跟踪的文件`tracked`，第二个是未被诶跟踪的文件`untracked`，第三个就是被忽略的文件`ignore`。

有些文件我们不管在何时都不想提交。例如`node.js`项目目录下的`config/development.json`，这里面可能存有我们开发环境中的数据库账号及密码。

当然，我们当然可以不提交他，但每次查看状态时总能看到红色的`untracked`，并不友好。

这时候可以在根目录下添加一个`.gitignore`文件，其中列出想要忽略的文件。

```
config/development.json
```

然后保存并`push`到远程仓库即可。

但不免有时候我们会忽略一些情况，某些应该被追踪的文件却无法添加到暂存区。

我们可以使用`git check-ignore {filename}`来检查：

```bash
$ git check-ignore -v {filename}
```

可选参数`-v`用来打印更多信息。

如果想省劲，我们也可以通过`-f`参数来强制添加：

````bash
$ git add -f file.c
````



### 命令别名

使用`git config --global alias.{alias} {command}`为命令设置别名：

```bash
$ git config --global alias.unstage 'restory --staged'
```

```bash
$ git config --global alias.br branch
```

```bash
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

想要删除别名，可以通过查看`~/.gitconfig`进行修改：

```bash
$ cat ~/.gitconfig
```

> [core]
>
> ​     editor = \"A:\\Development\\Microsoft VS Code\\Code.exe\" --wait
>
> ​     autocrlf = false
>
> [filter "lfs"]
>
> ​     clean = git-lfs clean -- %f
>
> ​     smudge = git-lfs smudge -- %f
>
> ​     process = git-lfs filter-process
>
> ​     required = true
>
> [user]
>
> ​     name = GaoLiHai
>
> ​     email = 1019933576@qq.com
>
> [color]
>
> ​     ui = true
>
> [alias]
>
> ​     lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

通过修改`[alias]`下面的东西即可修改/删除别名。
