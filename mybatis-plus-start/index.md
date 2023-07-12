# MyBatis-Plus初级运用


使用之前需要掌握：

- 拥有 Java 开发环境以及相应 IDE
- 熟悉 Spring Boot
- 熟悉 Maven

---

## 1.数据表准备

以User表为例

| id | name  | age  | email             |
| -- | :---: | :--: | :---------------: |
| 1  | Jone  | 18   | test1@baomidou.com|
| 2  | Jack  | 20   | test2@baomidou.com|
| 3  | Tom   | 28   | test3@baomidou.com|
| 4  | Sandy | 21   | test4@baomidou.com|
| 5  | Billie| 24   | test5@baomidou.com|

其数据库DDL脚本如下：

~~~sql
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
    id BIGINT(20) NOT NULL COMMENT '主键ID',
    name VARCHAR(30) NULL DEFAULT NULL COMMENT '姓名',
    age INT(11) NULL DEFAULT NULL COMMENT '年龄',
    email VARCHAR(50) NULL DEFAULT NULL COMMENT '邮箱',
    PRIMARY KEY (id)
);
~~~

其插入数据脚本如下：

~~~sql
DELETE FROM user;
INSERT INTO user (id, name, age, email) VALUES
(1, 'Jone', 18, 'test1@baomidou.com'),
(2, 'Jack', 20, 'test2@baomidou.com'),
(3, 'Tom', 28, 'test3@baomidou.com'),
(4, 'Sandy', 21, 'test4@baomidou.com'),
(5, 'Billie', 24, 'test5@baomidou.com');
~~~

+ 2.框架搭建

1. 使用 [Spring Initializer (opens new window)](https://start.spring.io/)快速初始化一个 Spring Boot 工程

2. 添加依赖

    mybatis-plus支持MySQL，Oracle，DB2，H2，HSQL，SQLite，PostgreSQL，SQLServer，Phoenix，Gauss ，ClickHouse，Sybase，OceanBase，Firebird，Cubrid，Goldilocks，csiidb，informix，TDengine，redshift，此处只使用h2举例

   ~~~xml
       <dependency>
           <groupId>com.baomidou</groupId>
           <artifactId>mybatis-plus-boot-starter</artifactId>
           <version>最新版本</version>
       </dependency>
       
       <dependency>
           <groupId>com.h2database</groupId>
           <artifactId>h2</artifactId>
           <scope>runtime</scope>
       </dependency>
   ~~~

3. 配置application.yaml

      ~~~yaml
      # DataSource Config
      spring:
        datasource:
          driver-class-name: org.h2.Driver
          schema: classpath:db/schema-h2.sql
          username: root
          password: test
        sql:
          init:
            schema-locations: classpath:db/schema-h2.sql
            data-locations: classpath:db/data-h2.sql
      ~~~

+ 3.编码

编写实体类 `User.java`（此处使用了 `Lombok` 简化代码）

~~~java
@Data
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
 ~~~

编写 Mapper 包下的 UserMapper接口

~~~java
public interface UserMapper extends BaseMapper<User> {

}
~~~

+ 4.开始使用

添加测试类，进行功能测试：

~~~java
@SpringBootTest
public class SampleTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testSelect() {
        System.out.println(("----- selectAll method test ------"));
        //UserMapper 中的 selectList() 
        //方法的参数为 MP 内置的条件封装器 Wrapper，所以不填写就是无任何条件
        List<User> userList = userMapper.selectList(null);
        Assert.assertEquals(5, userList.size());
        userList.forEach(System.out::println);
    }
}
~~~

控制台输出：

~~~java
User(id=1, name=Jone, age=18, email=test1@baomidou.com)
User(id=2, name=Jack, age=20, email=test2@baomidou.com)
User(id=3, name=Tom, age=28, email=test3@baomidou.com)
User(id=4, name=Sandy, age=21, email=test4@baomidou.com)
User(id=5, name=Billie, age=24, email=test5@baomidou.com)
~~~

