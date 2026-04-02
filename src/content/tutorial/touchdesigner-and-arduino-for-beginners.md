---
title: "TouchDesigner & Arduino for Beginners"
description: ""
date: "2018-04-01"
thumbnail: "/images/touchdesigner-and-arduino-for-beginners.webp"
tags: ["TouchDesigner"]
---

[TD_Arduino.toe](https://assets.ctfassets.net/jucn867nka4i/2AWCq5uEomXMVn6HS0z0Jo/89ae1b822a25f24088b3b5821ec77ce9/TD_Arduino.toe)

## Arduinoとは

- フィジカルコンピューティングのためのオープンソースプラットフォーム
- シンプルな入出力(I/O)ボード、Cライクな言語、および統合開発環境などから構成される
- デザイナーやアーティストにとって使いやすいProcessingのIDEがベース
- ソフト、ハードともにオープンソース
- ハードウェアが低価格であり、壊れてもそこまで痛くない
- 単体でもソフトウェアと連携しても使える
- アイデア次第でなんでもできる
- リファレンスがめっちゃある

## 使用するもの

- PC
- Arduino (今回はArduino Unoを使用します)

![arduino uno](/images/content/arduino_uno.webp)

- USBケーブル (ArduinoとPCを繋げる用)

![usb cable](/images/content/usb_cable.webp)

- ブレッドボード(はんだ付けをしなくてもすむ！)

![bread board](/images/content/bread_board.webp)

- ジャンパワイヤ(Arduinoとブレッドボード等を接続します

![jump wire](/images/content/jump_wire.webp)

- センサーなど諸々 (その都度説明します)

## ArduinoとTouchDesignerの連携方法

#### Serial通信

伝送路上を一度に1ビットずつ、逐次的にデータを送る通信方式

## 実際に動かしてみよう!!

Arduinoの “Hello World!”
<b>Lチカ</b>(LEDをチカチカさせます)

使用するもの

- LED (内部抵抗あり)
- 抵抗(適切な抵抗値の抵抗を選んでください, 今回は150Ω)ページの一番下に説明あり

LEDは足が長い方が+で短い方が−になります
逆だと電気は流れません

LチカのプログラムLチカ

<code>const int ledPin = 2;  //定数、変数の定義部分

void setup() {  //Arduino起動時に一度だけ実行される部分
  pinMode(ledPin, OUTPUT);
}

void loop() {  //ボードの電源が切れるまで繰り返し実行される部分
    digitalWrite(ledPin, HIGH);
    delay(1000);  //1000ms(1秒)待つ
    digitalWrite(ledPin, LOW);
    delay(1000);  //1000ms(1秒)待つ
}</code>

### Arduinoへプログラムの書き込む方法

![serial port](/images/content/serial_port.webp)

プログラムを書き、保存をしたら
ツール-&gt;ボードを “Arduino/Genuino Uno” (使用しているボード)
ツール-&gt;シリアルポートを 表示されているポートに合わせてください
(WindowsだとCom3など、Macだと/dev/cu.usbmodem1421などのような表示です)

![write](/images/content/write.webp)

二つを設定したら、左上の矢印ボタンで書き込みができます

![write finish](/images/content/write_finish.webp)

以下の画像のように表示されたら書き込み完了です

1秒間隔でLEDが点滅します！

### Serial.begin() &amp; Serial.print()

Arduinoからシリアル通信で情報を送信する場合
まず、シリアル通信の準備にSerial.begin()
送信にはSerial.print() という関数を用いますSerial.print()

<code>int count = 0;

void setup() {
  Serial.begin(9600);  //シリアル通信の準備
}

void loop() {
    count++;
    Serial.print(count);  //データ送信
    delay(1000);  //１秒待つ
}</code>

![serial print](/images/content/serial_print.webp)

Arduino IDEのシリアルモニタから送信されたデータを確認

![serial monitor](/images/content/serial_monitor.webp)

改行がされない…
Serial.print()ではデータのみを送信します
なので改行記号等も自分で書かなくてはいけません
そんなめんどくさい時に使うのがSerial.println()です
データの最後に自動で改行文字( \r\n )が挿入されます
使い方はSerial.print()と一緒です
先程のカウントのコードでSerial.print()をSerial.println()に書き換えてみましょう

<code>int count = 0;

void setup() {
  Serial.begin(9600);  //シリアル通信の準備
}

void loop() {
    count++;
    Serial.println(count);  //データ送信
    delay(1000);
}</code>

シリアルモニタを見てみると

![serial monitor n](/images/content/serial_monitor_n.webp)

送信されたデータごとに改行がされています
TouchDesignerでSerialを受信する時には、改行記号がデータの最後に付いていると扱いやすいです

### TouchDesignerでSerialを受信

![TD serial DAT](/images/content/TD_serial_DAT.webp)

TDSW_Arduino.toe-&gt;<code>/project1/serial_display</code>
次はシリアルモニタではなくTouchDesigner側でSerialを受信してみましょう
SerialDATを作ります
パラメータでポートを繋いであるArduinoのもの(IDEで出たのと同じもの)
Baud Rate をSerial.begin() で設定した値にします(今回は9600)

その後ActiveをONにするとSerialDATに先程のシリアルモニタど同様の値が来ているのが確認できます

![TD serial DAT 2](/images/content/TD_serial_DAT_2.webp)

### 物理ボタンのOnOffをTouchにSerialに送信

TDSW_Arduino.toe-&gt;<code>/project1/button_switching</code>
次は物理的なボタンを用いてTouchDesignerの画像を切り替えてみましょう

- 使用するもの

- タクトスイッチ
- 抵抗(150Ω) (プルダウン抵抗として使用)

![bread board sample1](/images/content/bread_board_sample1.webp)

ボタンが押されてるかどうかを0/1でSerialで送信

<code>int inPin = 6;
int value = 0;

void setup() {
  pinMode(inPin, INPUT);
  Serial.begin(9600);
}

void loop() {
    value = digitalRead(inPin);
    Serial.println(value);

    delay(100);
}</code>

![TD serial DAT par](/images/content/TD_serial_DAT_par.webp)

![TD network](/images/content/TD_network.webp)

押していない時0、押されている時に1を送るのでその値をTouchDesigner側で利用しましょう
まず最新の値一つしか用いない為SerialDATのMaximum Linesを1にします

- datto-&gt;DAT : null1
- countCHOP-&gt;Limit : Loop Min/Max
- countCHOP-&gt;Limit Maximum : １

![TD DAT](/images/content/TD_DAT.gif)

そしてcountCHOPの値を画像を切り替えるSwitchTOPのindexに入れてあげると完成

### Touchで送った文字列がそのままシリアルで帰ってくるプログラム

TDSW_Arduino.toe-&gt;<code>/project1/send_text</code>

<code>int incomingByte = 0;
char buffer[16];
int len = 0;
void setup() {
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() &gt; 0){
    int incomingByte = Serial.read();
    buffer[len++] = incomingByte;
    if (len &gt;= 16){
        len = 0;
    }

    if (incomingByte == &#39;\n&#39;){
        Serial.print(buffer);

        for(int i = 0; i&lt;len; i++){
          buffer[i] = &#39; &#39;;
        }

        len = 0; // reset buffer counter
    }
  }  
}
</code>

### 加速度センサxyz軸の値をTouchに送る

TDSW_Arduino.toe-&gt;<code>/project1/acceleration_xyz</code>

<code>int xPin = 2;
int yPin = 1;
int zPin = 0;

int x_val = 0;
int y_val = 0;
int z_val = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
    x_val = analogRead(xPin);
    Serial.print(x_val);
    Serial.print(&quot;,&quot;);
    y_val = analogRead(yPin);
    Serial.print(y_val);
    Serial.print(&quot;,&quot;);
    z_val = analogRead(zPin);
    Serial.print(z_val);
    Serial.println();

    delay(100);
}</code>

![bread board acc](/images/content/bread_board_acc.webp)

### TouchのSliderからLEDの光の強さを制御

TDSW_Arduino.toe-&gt;<code>/project1/light_slider</code>

<code>int incomingByte = 0;
char buffer[16];
int len = 0;

int ledValue = 0;
int ledPin = 3;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (Serial.available() &gt; 0){
    int incomingByte = Serial.read();
    buffer[len++] = incomingByte;
    if (len &gt;= 16){
        len = 0;
    }

    if (incomingByte == &#39;\n&#39;){
        ledValue = atoi(buffer);
        Serial.println(ledValue);

        analogWrite(ledPin, ledValue);

        for(int i = 0; i&lt;len; i++){
          buffer[i] = &#39; &#39;;
        }

        len = 0;
    }
  }  
}</code>

![bread board led](/images/content/bread_board_led.webp)

## 最後に

TouchDesignerとArduinoの組み合わせはアイデア次第でどんなものでも作れます。
トライアンドエラーを繰り返し面白いものを作っていきましょう！
(怪我や火事等には十分ご注意ください)

## 参考文献

[Arduino公式](https://www.arduino.cc/)
[Derivative Arduinoページ](https://docs.derivative.ca/Arduino)
[O’Reilly Arduinoをはじめよう (書籍)](https://www.oreilly.co.jp/books/9784873117331/)

---

### 抵抗値の計算

使用するLEDのデータシートを見ると最大定格(mA)というものがあります
これはそのLEDに流すことの出来る最大電流でそれを超えて流し続けると劣化や破損をおこす値を表したものです
なのでLEDに流れる電流を抑えるために抵抗を使います
<code>電圧=電流×抵抗値</code> オームの法則
例えば5VのArduinoで最大定格20mA(=0.02A), 順電圧2VのLEDを使う場合
<code>(5-2)V = 0.2A × 抵抗値</code> となるので
使う抵抗の抵抗値は150Ωとなります
参考文献
[http://www.my-craft.jp/html/aboutled/led_jyundenatsu.html](http://www.my-craft.jp/html/aboutled/led_jyundenatsu.html)