# JavaScript Lessons
![アクセス (1)](https://github.com/haru-programming/JavaScript-lessons/assets/67426438/5e94ba42-bd8f-4cc6-a24c-3bf8dcab7926)

- もりけん塾で[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md)に取り組んだ記録です。<br>
- 現役フロントエンドエンジニアのもりけんさん([@terrace_tec](https://twitter.com/terrace_tech))をはじめ、塾生の皆さんからレビューをいただきながら課題を進めました。
<br>
<br>

## 制作物とログイン方法
- 冒頭のSITE MAPのコンテンツを作成しました。
- デモ：[StackBlitz](https://stackblitz.com/edit/stackblitz-starters-7xwkju?file=src%2Flesson37%2Fjs%2Farticle.js)
- Lesson37のリンクから下記のjsonデータでコンテンツにログインすることができます。
- 会員登録は、ご自身のお好きなもので登録ができ、ディベロッパーツールのApplicationタブから登録内容を見ることができます。パスワード変更も実際にできます。
- 今回の課題では、会員登録内容を使ってログインをすることはできません。（不特定多数の個人情報がAPIデータに溜まっていくことを防ぐためです）

ログインの際には以下のjsonデータをご利用ください。
```js
{
"name": "Dicki",
"email": "Lane20@example.net",
"password": "cW3SfU2Lkfb1Yfm",
"userId": "f612ba1c0c5ccf45c0f57e97",
"id": "4"
},
```

## 各課題の内容とまとめ
|  課題の仕様  | 内容 | アウトプットブログ |
| :---         |     :---      |          :--- |
| [1](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#1%E3%81%93%E3%81%AEdom%E3%82%92html%E5%86%85%E3%81%AEul%E3%81%AE%E4%B8%AD%E3%81%AB%E5%B7%AE%E3%81%97%E8%BE%BC%E3%82%93%E3%81%A7%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84)  | **【DOM構築】**<br>指定されたDOMをulに挿入  | [lesson01](https://happy-making.com/javascript-lesson01/)  |
| [2](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#2%E3%81%93%E3%81%AEdom%E3%82%92javascript%E3%81%A7%E3%81%A4%E3%81%8F%E3%82%8Ahtml%E5%86%85%E3%81%AEul%E3%81%AE%E4%B8%AD%E3%81%AB%E5%B7%AE%E3%81%97%E8%BE%BC%E3%82%93%E3%81%A7%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84)    | DOMを作りulに挿入      | [lesson02](https://happy-making.com/javascript-lesson02/)      |
| [3](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#3)     | DOMを作りulに挿入  　　　　　　　　| [lesson03](https://happy-making.com/javascript-lesson03/)      |
| [4](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#4)     | a,imgの内容を配列から出力する  | [lesson04](https://happy-making.com/javascript-lesson04/)      |
| [5](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#5)     | **【Promiseオブジェクト】**<br>Promiseで課題4の配列を解決された値として受け取る  | [lesson05](https://happy-making.com/javascript-lesson05/)      |
| [6](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#6)     | 課題5を5秒後に解決されるようにする  | [lesson06](https://happy-making.com/javascript-lesson06/)      |
| [7](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#7)     | **【ローディング実装】**<br>resolveになるまでloading画像を出す  | [lesson07](https://happy-making.com/javascript-lesson07/)      |
| [8](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#8)     | あえてrejectさせthenでエラーを受け取る  | [lesson08](https://happy-making.com/javascript-lesson08/)      |
| [9](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#9)     | async/awaitで書き換える  | [lesson09](https://happy-making.com/javascript-lesson09/)      |
| [10](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#10)     | try-catch-finaliyを追加する  | [lesson10](https://happy-making.com/javascript-lesson10/)      |
| [11](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#11)     | **【擬似的にAPIを扱う】**<br>モックデータを作りfetchで取得する  | [lesson11](https://happy-making.com/javascript-lesson11/)  |
| [12](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#12)     | ボタンをクリックしたらリクエストする  | [lesson12](https://happy-making.com/javascript-lesson12/)  |
| [13](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#13)     | クリックでモーダルが出てきて、課題12のボタンを押すとリクエストする  | [lesson13](https://happy-making.com/javascript-lesson13/)  |
| [14](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#14)     | 課題13のモーダルにinputをおき、valueを取得する  | [lesson14](https://happy-making.com/javascript-lesson14/)  |
| [15](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#15)     | **【モーダル作成】**<br>モーダルにform,input(number,text)を置き、submitボタンを押下時にAPIから値を取得する  | [lesson15](https://happy-making.com/javascript-lesson15/)  |
| [16](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16)     | **【ニュースUIコンポーネント作成】**<br>ニュース記事のデータを取得してYahoo風のタブUIを作成。jsonデータ構造も考える。  | [lesson16](https://happy-making.com/javascript-lesson16/)  |
| [17](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#17)     | **【スライドショー作成】**<br>1からスライダーを作成。3秒後に解決されるPromiseが返すオブジェクトから画像を表示。矢印でスライドを動かす。現在地の数字を実装する。  | [lesson17](https://happy-making.com/javascript-lesson17/)  |
| [18](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#18)     | ドットのページネーションを追加する。3秒後に自動で次のスライドに移動するオート機能も追加。  | [lesson18](https://happy-making.com/javascript-lesson18/)  |
| [19](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#19)     | **【ニュースUIコンポーネントとスライドショーを合わせる】**  |   |
| [20](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#20)     | **【ユーザーテーブル作成】**<br>3秒後に解決されるPromiseが返すオブジェクトからテーブルを作成。  | [lesson20](https://happy-making.com/javascript-lesson20/)  |
| [21](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#21)     | **【ユーザーテーブルにソート機能を追加】**<br>idを昇順・降順・通常でソートできる | [lesson21](https://happy-making.com/javascript-lesson21/)  |
| [22](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#22)     | 年齢も昇順・降順・通常でソートできる | [lesson22](https://happy-making.com/javascript-lesson22/)  |
| 23     | deprecatedにより飛ばしました |   |
| [24](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#24)     | **【会員登録画面作成】**<br>利用規約のモーダル内の文章を下まで読むと、同意inputにチェックが入る | [lesson24](https://happy-making.com/javascript-lesson24/)  |
| [25](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#25)     | **【バリデーション】**<br>指定のバリデーションをpassした場合のみ、submitボタンが押せる | [lesson25](https://happy-making.com/javascript-lesson25/)  |
| [26](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#26)     | **【ログイン画面作成】**<br>mockAPIのデータと照合してログインできるようにする。ログインが成功したらトークンを発行してLocalStorageに保存する | [lesson26](https://happy-making.com/javascript-lesson26/)  |
| [27](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#27)     | トークンがあればコンテンツに遷移する | |
| [28](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#28)     | **【パスワードを忘れた方へページ】**<br>会員登録の内容をLocalStorageに保存して、パスワードを忘れた方ページにてメールアドレスが一致すればパスワードを変更できる | [lesson28](https://happy-making.com/javascript-lesson28/)  |
| [29](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#29)     | **【メールアドレス変更画面ページ】**<br>メールアドレス変更機能 | [lesson29](https://happy-making.com/javascript-lesson29/)  |
| [30](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#30)     | **【自作ドロワーメニュー】**<br>ハンバーガーボタンを押すと横からシュッと出るメニューを作成 | [lesson30](https://happy-making.com/javascript-lesson30/)  |
| [31](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#31)     | **【自作ドロワーメニューにオプショナルをつける】**<br>スライドスピードとモーションを変更できる機能を追加 | [lesson31](https://happy-making.com/javascript-lesson31/)  |
| [32](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#32)     | **【一覧ページと絞り込み機能】**<br>ニュース記事一覧と動的な絞り込み機能 | [lesson32](https://happy-making.com/javascript-lesson32/)  |
| [33](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#33)     | ドロワーメニュー内の要素をクリックするとコンテンツに遷移 |  |
| [34](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#34)     | **【マイページとお気に入り機能実装】**<br>ニュース記事の個別ページを作成。 お気に入りボタンを押すとお気に入りに追加できる。マイページでお気に入り一覧を表示、削除ボタンで削除もできる。| [lesson34](https://happy-making.com/javascript-lesson34/)  |
| [35](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#35)     | **【ログインユーザーか非ログインユーザーか判定して見れるコンテンツを分ける】**| [lesson35](https://happy-making.com/javascript-lesson35/)  |
| [36](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#36)     | **【無限スクロール】**<br>記事一覧の下までスクロールすると、APIからデータをfetchして次の記事を表示させる。| [lesson36](https://happy-making.com/javascript-lesson36/)  |
| [37](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#37)     | 全てのコンテンツを集め、ブラッシュアップ | [lesson37](https://happy-making.com/javascript-lesson37/) <br>..今までのまとめ記事 |
