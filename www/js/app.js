// NCMB アクセスの準備
var ncmb = new NCMB(appKey, clientKey);

///// Called when app launch
$(function() {
    $.mobile.defaultPageTransition = 'none';
    $("#LoginBtn").click(onLoginBtn);
    $("#RegisterBtn").click(onRegisterBtn);
    $("#YesBtn_logout").click(onLogoutBtn);
});

//----------------------------------USER MANAGEMENT-------------------------------------//
var currentLoginUser; //現在ログイン中ユーザー

function onRegisterBtn() {
    //入力フォームからusername, password変数にセット
    var username = $("#reg_username").val();
    var password = $("#reg_password").val();
    
    var user = new ncmb.User();
    user.set("userName", username)
        .set("password", password);
    
    // ユーザー名とパスワードで新規登録
    user.signUpByAccount()
        .then(function(reg_user) {
            // 新規登録したユーザーでログイン
            ncmb.User.login(reg_user)
                     .then(function(login_user) {
                         alert("新規登録とログイン成功");
                         currentLoginUser = ncmb.User.getCurrentUser();
                         $.mobile.changePage('#DetailPage');
                     })
                     .catch(function(error) {
                         alert("ログイン失敗！次のエラー発生: " + error);
                     });
        })
        .catch(function(error) {
            alert("新規登録に失敗！次のエラー発生：" + error);
        });
}

function onLoginBtn() {
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
}

function onLogoutBtn() {
    ncmb.User.logout();
    alert('ログアウト成功');
    currentLoginUser = null;
    $.mobile.changePage('#LoginPage');
}


// ----------------------------ここから下に書く-------------------------------

// addBtn関数
function addBtn() {
    // 利用するデータベースを指定（存在しなければ生成）
    var TestClass = ncmb.DataStore("Book");
    // 登録するレコードを用意
    var testClass = new TestClass();
    var key1 = "Title";
    var value1 = $("#book_title").val();
    var key2 = "Price";
    var value2 = $("#book_price").val();
    // レコードのフィールドと値を設定
    testClass.set(key1, value1);
    testClass.set(key2, value2);
    // レコードをデータベースに登録
    testClass.save()
    .then(function(m) {
    $("#message").html("Success");
    })
    .catch(function(err){
    $("#message").html("Failed: " + JSON.stringify(err));
    })
}

// lookBtn関数
function lookBtn() {
    var TestClass = ncmb.DataStore("Book");
    TestClass.fetchAll()
    .then(function(results){
        var msg = "";
        msg += "<table border=20 bgcolor=lightgreen style=font-size:20px>";
        msg += "<tr><th bgcolor=yellow>Title</th><th bgcolor=yellow>Price</th></tr>";
        for(var i = 0; i < results.length; i++) {
            var data=results[i].get("Title");
            var update=results[i].get("Price");
            msg += "<tr><th>" + data + "</th><th>" + update + "<br></th></tr>";
        }
        msg += "</table>";
        $("#message").html(msg);
    })
}

// 本アプリで使うクラスの指定。const は定数の宣言。変更できない変数と思えば良い。
const db = "Book";

// SortPriceBtn関数
function SortPriceBtn() {
    let TestDataClass = ncmb.DataStore(db);
    TestDataClass.order("Price", true).fetchAll()
        .then(function(results) {
          showResults(results);
        })
}

// SortTitleBtn関数
function SortTitleBtn() {
    let TestDataClass = ncmb.DataStore(db);
    TestDataClass.order("Title", false).fetchAll()
        .then(function(results) {
          showResults(results);
        })
}

// countBook関数
function countBookBtn(results) {
    let TestDataClass = ncmb.DataStore(db);
    TestDataClass.count().fetchAll()
        .then(function(results) {
            var msg = String(results.count) + "冊が管理されています。";
            $("#cntmessage").html(msg);
        })
        .catch(function(err){
            var msg = "Error:" + err;
            $("#cntmessage").html(msg);
        });
}

// deleteBook関数
    function deleteBookBtn() {
    let TestDataClass = ncmb.DataStore(db);
    TestDataClass.fetch()
        .then(function(results) {
            return results.delete();
        })
        .then(function(results) {
          $("#message").removeClass();
          $("#message").html("<font color='#ff0000'> delete success <br>");
          countBookBtn();  // データを1つ消すとcountの値も1つ減るので、countの結果を一致させるためにcountBookBtn関数も呼び出す
        })
        .catch(function(error) {
          $("#message").removeClass();
          $("#message").addClass("bg-warning");
          $("#message").html("delete fail:" + JSON.stringify(error));
        })
}

function showResults(results) {
        var msg = "";
        msg += "<table border=20 bgcolor=lightgreen style=font-size:20px>";
        msg += "<tr><th bgcolor=yellow>Title</th><th bgcolor=yellow>Price</th></tr>";
        for(var i = 0; i < results.length; i++) {
            var data=results[i].get("Title");
            var update=results[i].get("Price");
            msg += "<tr><th>" + data + "</th><th>" + update + "<br></th></tr>";
        }
        msg += "</table>";
        $("#message").html(msg);
}