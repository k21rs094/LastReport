# 最初に読むこと
2022年後期「クラウドプログラミング演習」の最終課題のプログラムをここで管理する。

https://github.com/NIFCLOUD-mbaas/monaca_login_template

なお、**上記のプログラムをベースに開発した。**

---

# Monaca x NIFCLOUD mobile backend 会員ログインサンプル

<!-- PJ Update 2020/07/13 -->
<!-- JS SDK Ver. 3.0.0 -->

===

* 本サンプルは不具合がある場合、issue等から報告いただくようにお願いいたします
* 作成日：2015/8（更新日：2021/1）

# 概要

Monacaを用いて作ったアプリとmobile backendを連携して、ログイン機能を実装するサンプルコードとなります。
* HTML/CSS/JavaScriptでマルチプラットフォーム（iOS/Android/Windowsなど）にアプリを開発できる統合開発環境[Monaca](https://ja.monaca.io/)
* スマホアプリのサーバ側機能（プッシュ通知、会員管理、DBなど）をサーバ開発不要で実装できる[NIFCLOUD mobile backend](https://mbaas.NIFCLOUD.com/?utm_source=community&utm_medium=referral&utm_campaign=sample_monaca_login_template)

![overview](readme-img/overview.JPG "概要図")

# 動作環境

* Cordova 9.0, Javascript SDK ver 3.0.0導入済み
* Monacaデバッグアプリ

## Demo

MonacaでgithubのURL（https://github.com/NIFCLOUD-mbaas/monaca_login_template.git） をインポートし、
アプリケーションキーとクライントキーを設定してください。

最初にログイン画面がでますので、「登録」ボタンを押し、登録画面へ遷移します。
登録画面にて、「ユーザー名」＋「パスワード」を入力し、ユーザー登録を行います。

その後、ログイン画面に戻り、登録した「ユーザー名」＋「パスワードの組み合わせで」
ログインができることを確認します。

※mBaaS管理画面の「会員管理」タブにて、ユーザー登録が完了したことを確認できます。

* ログイン画面

![demo1](readme-img/demo2.JPG "起動画面")

* ユーザー新規登録画面

![demo2](readme-img/demo3.JPG "登録完了")



## Requirement

* Monaca環境
* ニフクラ mobile backendを利用するために必要なJavaScript SDKは、下記の方法で導入済みです。
  - Monaca 画面上部にある「設定」＞「JS/CSSコンポーネント追加と削除」をクリック
  - 「ncmb」を入力して｢検索｣ボタンを押す
  - 「追加｣ボタンを押す
  -  最新バージョンを選択し ｢インストール開始｣ボタンを押す
  -  ローダーの設定は｢components/ncmb/min.js｣にチェックし｢OK｣ボタンを押す
  -  "JS/CSSコンポーネントをプロジェクトに追加しました。" 確認の｢OK｣ボタンを押す

※ 詳細は[イントロダクション (Monaca) : クイックスタート](https://mbaas.NIFCLOUD.com/doc/current/introduction/quickstart_monaca.html)をご参照ください

## Installation

* Monacaで新規アプリ作成し、プロジェクトをインポートする。
    * Monacaの利用登録
    [Monaca](https://ja.monaca.io/)

    <img src="readme-img/monaca.JPG" width="550" alt="新規プロジェクト" />
    
    * Monacaでインポートを選択し、新規プロジェクトを作成します。

    <img src="readme-img/monaca_new_project.JPG" width="550" alt="新規プロジェクト" />
    
    * 「URLからインポートする」を選択し、URLに https://github.com/NIFCLOUD-mbaas/monaca_login_template.git を指定します。

    <img src="readme-img/monaca_new_project_2.JPG" width="550" alt="新規プロジェクト" />

* mobile backendでアプリ作成する
  - mobile backend 利用登録
    [NIFCLOUD mobile backend](https://mbaas.NIFCLOUD.com/?utm_source=community&utm_medium=referral&utm_campaign=sample_monaca_login_template)
![register](readme-img/register.JPG "登録画面")
  - mobile backendでアプリ作成する  
![newapp](readme-img/newapp.JPG "新規アプリ作成")

* Monacaで作成したアプリをmobile backendサーバーと連携させる
  - Monacaでアプリケーションキー、クライアントキーを設定し、初期化を行う
![initialize2](readme-img/appKeyClientKey.JPG "初期化")  
キーをコピーし、追記します。

![initialize](readme-img/appKeyClientKey_setting.JPG "初期化")
  - monacaで動作確認する

![demo](readme-img/demo2.JPG "動作確認")

## Description

* コードの説明

File: www/js/app.js

 - 初期化設定

```JavaScript
var appKey    = "YOUR_APPKEY";
var clientKey = "YOUR_CLIENTKEY";
var ncmb = new NCMB(appKey, clientKey);
```

上記のコードでアプリケーションキーとクライアントキーを指定し、
NCMB(appKey, clientKey)　でmBaaSサーバと連携を行います。

 - ユーザ登録

NCMB.Userクラスを利用して、ユーザ登録を行います。

最初にuserという変数をNCMB.Userクラスのインスタンスとして作成します。
userに対し、set("key", "value")というメソッドを利用して、username, passwordをセットします。
他の属性（たとえば年齢や性別など）も、同様の形でセットできます。

セット後、signUpByAccount()メソッドを利用し、ユーザ登録を非同期にて行います。
メソッドチェインを行い、then(), catch() それぞれの場合の処理を定義します。
成功の場合、alertを出し、currentLoginUserをセットしてから、#DetailPageに遷移させます。

```JavaScript
//入力フォームからusername, password変数にセット
var username = $("#reg_username").val();
var password = $("#reg_password").val();

var user = new ncmb.User();
user.set("userName", username)
    .set("password", password);

// 任意フィールドに値を追加
user.signUpByAccount()
    .then(function(user) {
        alert("新規登録に成功");
        currentLoginUser = ncmb.User.getCurrentUser();
        $.mobile.changePage('#DetailPage');
    })
    .catch(function(error) {
        alert("新規登録に失敗！次のエラー発生：" + error);
    });
```

 - ユーザーログイン

ncmb.Userクラスを利用し、ユーザログインを行います。
ncmb.Userのloginメソッドを利用し、username, passwordを渡し、非同期にてログインを行います。
メソッドチェインを行い、then(), catch() それぞれの場合の処理を定義します。
ログイン成功した場合、alertを出し、currentLoginUserをセットしてから、#DetailPageに遷移します。

```JavaScript
var username = $("#login_username").val();
var password = $("#login_password").val();
// ユーザー名とパスワードでログイン
ncmb.User.login(username, password)
    .then(function(user) {
        alert("ログイン成功");
        currentLoginUser = ncmb.User.getCurrentUser();
        $.mobile.changePage('#DetailPage');
    })
    .catch(function(error) {
        alert("ログイン失敗！次のエラー発生: " + error);
    });
```

 - ユーザーログアウト

ncmb.Userクラスを利用し、ユーザログアウトを行います。
ncmb.Userのlogoutメソッドを利用し、ログアウトを行います。
ログアウトの後、currentLoginUserをリセットし、#LoginPageに遷移します。

```JavaScript
ncmb.User.logout();
alert('ログアウト成功');
currentLoginUser = null;
$.mobile.changePage('#LoginPage');
```

## Usage

サンプルコードをカスタマイズすることで、様々な機能を実装できます！
データ保存・データ検索・会員管理・プッシュ通知などの機能を実装したい場合には、
以下のドキュメントもご参考ください。

* [ドキュメント](https://mbaas.NIFCLOUD.com/doc/current/?utm_source=community&utm_medium=referral&utm_campaign=sample_monaca_login_template)
* [ドキュメント・データストア](https://mbaas.NIFCLOUD.com/doc/current/sdkguide/javascript/datastore.html?utm_source=community&utm_medium=referral&utm_campaign=sample_monaca_login_template)
* [ドキュメント・会員管理](https://mbaas.NIFCLOUD.com/doc/current/sdkguide/javascript/user.html?utm_source=community&utm_medium=referral&utm_campaign=sample_monaca_login_template)
* [ドキュメント・プッシュ通知](https://mbaas.NIFCLOUD.com/doc/current/sdkguide/javascript/push.html?utm_source=community&utm_medium=referral&utm_campaign=sample_monaca_login_template)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

* MITライセンス
* NIFCLOUD mobile backendのJavascript SDKのライセンス
