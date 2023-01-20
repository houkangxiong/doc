# Docker

## 1、初识

### docker解决的问题

:::tip
docker如何解决依赖的兼容问题？
:::

- 将应用的Libs（函数库）Deps（依赖）配置与应用一起打包
- 将每个应用放到一个隔离容器去运行，避免相互干扰

![image-20230110145338066](/assets/image-20230110145338066.png)

> 开发测试及操作系统环境差异如何解决？

![image-20230110145617282](/assets/image-20230110145617282-1673333780020-1.png)

Ubuntu和Centos都是基于Linux内核，只是系统应用不同、提供的函数库有差异，这就是不能跨系统的原因；

- docker将用户程序和所需要的系统函数库一起打包
- docker运行到不同操作系统时，直接基于打包的库函数，借助操作系统的Linux内核来运行

> 总结

- docker允许开发中将应用、函数库、配置一起打包形成可移植镜像，可以迁移到任意Linux系统
- 利用沙箱机制形成隔离容器，各个应用互不干扰
- 启动、移除十分方便

### docker和虚拟机

> 区别在哪？

![image-20230110151701210](/assets/image-20230110151701210.png)

- 虚拟机模拟了整个操作系统，docker只封装了部分环境
- docker是一个进程，虚拟机是操作系统中模拟出的操作系统，所以docker速度更快

### 镜像和容器

> 镜像

镜像就是docker将应用程序及函数库、依赖、环境等配置打包在一起，称为镜像

> 容器

镜像中的程序运行起来就是容器，docker将其隔离，对外不可见

> docker和dockerHub

dockerHub是一个托管平台，类似的阿里云

### 安装docker

> 安装yum工具

```sh
yum install -y yum-utils \
           device-mapper-persistent-data \
           lvm2 --skip-broken
```

> 设置阿里镜像源

```sh
# 设置docker镜像源
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

yum makecache fast
```

> 安装docker社区版

```sh
yum install -y docker-ce
```

> 启动docker

```sh
systemctl start docker  # 启动docker服务

systemctl stop docker  # 停止docker服务

systemctl restart docker  # 重启docker服务
```

> 查看版本

![image-20230110153310121](/assets/image-20230110153310121.png)

## 2、基本使用

### nginx举例镜像

> 拉取镜像
>
> 注：版本使用最新可以没有版本号

![image-20230110155042293](/assets/image-20230110155042293-1673337044090-3.png)

```sh
docker pull nginx
```

> 查看镜像

![image-20230110155241106](/assets/image-20230110155241106.png)

```sh
docker images
```

> 删除镜像

```sh
docker rmi nginx
```

![image-20230110155634278](/assets/image-20230110155634278.png)

> 保存镜像

![image-20230110160255984](/assets/image-20230110160255984.png)

```sh
docker save -o /opt/nginx.tar nginx
```

> 本地拉取镜像

![image-20230110160556950](/assets/image-20230110160556950.png)

```sh
docker load -i /opt/nginx.tar
```

### mysql举例容器

![image-20230110163041225](/assets\image-20230110163041225.png)

这是dockerhub给出的命令

我们还需指定端口、挂载的配置文件等

![image-20230110163310966](/assets/image-20230110163310966.png)

官网会给出配置cnf位置

![image-20230110163507405](/assets/image-20230110163507405.png)

官网还会指出data的挂载位置

> 如果你想启动其他的容器如redis，替换配置内容
>
> 参考官网给出所需的配置，这里以mysql举例

我们创建/tmp/mysql/conf和/tmp/mysql/data

在conf下添加配置文件hmy.conf

![image-20230110165221677](/assets/image-20230110165221677.png)

> 启动

```sh
docker run --name mysql -e MYSQL_ROOT_PASSWORD=333 -p 3306:3306 -v /tmp/mysql/conf/hmy.cnf:/etc/mysql/conf.d/hmy.cnf -v /tmp/mysql/data:/var/lib/mysql -d mysql:8.0
```

> 重启

docker stop 容器id

> 关闭

docker restart 容器id

### 数据卷volume

- 数据卷是一个虚拟目录，指向宿主机文件系统的某个目录，在宿主机修改，容器内配置随之改变

```sh
docker volume ls #查看volume列表
docker volume inspect es-data#查看挂载位置
```

![image-20230110161840807](/assets/image-20230110161840807.png)

```sh
docker volume create html #创建html
docker volume rm html #删除html
```

![image-20230110162512547](/assets/image-20230110162512547.png)

### 自定义镜像

### DockerCompose
