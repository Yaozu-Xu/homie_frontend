<template>
  <b-container fluid style="padding: 0; margin: 0">
    <IndexHeader></IndexHeader>
    <div class="main">
      <img src="../assets/logo.png" />
      <h1>homie pub</h1>
      <p class="description">一个属于你自己的博客</p>
      <p class="action">
        <a class="btn btn-outline-success join" href="/join">加入我们</a>
        <a class="btn btn-outline-primary author" href="/index/xyz">作者博客</a>
      </p>
    </div>
    <RightSideBar></RightSideBar>
    <div class="instruction">
      <b-row>
        <b-col class="details" sm>
          <h2>注册说明</h2>
          <p>本站完全免费,只需要正确填写注册的邮箱账号,以确保能收到激活邮件。</p>
        </b-col>
        <b-col class="details" sm>
          <h2>激活邮件</h2>
          <p>注册后,请去您填写的邮箱中查收激活邮件,一般在1分钟内就会收到!</p>
        </b-col>
        <b-col class="details" sm>
          <h2>邮件查收</h2>
          <p>如果邮箱的收件箱中没有，请去邮箱的垃圾箱中查收!!!</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="details" sm>
          <h2>网站说明</h2>
          <p>您可以将本站当成只属于您的个人博客,发表文章,分享日常。</p>
        </b-col>
        <b-col class="details" sm>
          <h2>设计初心</h2>
          <p>本站没有设计留言和好友功能,仅当成一个分享自己心情的平台</p>
        </b-col>
        <b-col class="details" sm>
          <h2>Bug反馈</h2>
          <p>有任何bug和建议请向我反馈,作者邮箱 2589231996@qq.com</p>
        </b-col>
      </b-row>
    </div>
    <div class="bottom">
      <div class="txt">
        <i class="fa fa-certificate" aria-hidden="true" style="color: rgba(156, 152, 152, 0.6)"></i>
        <a href="http://www.beian.miit.gov.cn" target="_blank">苏ICP备18057600号-2</a>
      </div>
    </div>
  </b-container>
</template>

<style lang="scss">
.main {
  img {
    display: block;
    margin: 40px auto;
    width: 150px;
    height: 150px;
  }
  h1 {
    text-align: center;
    color: #444c5a;
  }
  .description {
    margin-top: 30px;
    text-align: center;
    font-size: 20px;
    line-height: 1.3;
    color: #6a8bad;
  }
  .action {
    margin-top: 30px;
    text-align: center;
    .join {
      color: #28a745;
      margin-right: 10px;
    }
    .join:hover {
      color: #fff;
    }
    .author {
      color: #007bff;
      margin-left: 10px;
    }
    .author:hover {
      color: #fff;
    }
  }
}

.instruction {
  border-top: 1px solid #eaecef;
  border-bottom: 1px solid #eaecef;
  margin: 40px 40px 0px 40px;
  .row {
    margin-top: 40px;
    .details {
      margin-left: 30px;
      p {
        margin-top: 20px;
        color: #4e6e8e;
      }
      h2 {
        font-weight: 500;
        font-size: 1.4rem;
        color: #3a5169;
      }
    }
  }
}

.bottom {
  margin-top: 40px;
  height: 80px;
  border-top: 1px solid #dfdede;
  background-color: #f3f2f2;
  .txt {
    margin: 10px 0 0 70px;
    a {
      padding-left: 10px;
      color: rgba(156, 152, 152, 0.6);
    }
  }
}

@media screen and (max-width: 768px) {
  .instruction {
    .row {
      margin-top: 20px;
      .details {
        margin-top: 20px;
      }
    }
  }
}
</style>

<script>
import IndexHeader from "@/components/index/header";
import RightSideBar from "@/components/index/right_side_bar";

export default {
  components: {
    IndexHeader,
    RightSideBar
  }
};
</script>