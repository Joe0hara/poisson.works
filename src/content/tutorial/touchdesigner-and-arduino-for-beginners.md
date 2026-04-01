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

![arduino uno](https://images.ctfassets.net/jucn867nka4i/6lepSvPHAC0PARW9dWjapg/914f4cd731b70b073ae7902076207a8b/arduino_uno.jpg)

- USBケーブル (ArduinoとPCを繋げる用)

![usb cable](https://images.ctfassets.net/jucn867nka4i/2ohcSdAySZqarkJgwXL1xR/130b223c14fbd7ddfb49ae88ed99c1b1/usb_cable.jpg)

- ブレッドボード(はんだ付けをしなくてもすむ！)

![bread board](https://images.ctfassets.net/jucn867nka4i/7oRduu4ZPkg65wNHey0Mzn/ea1b9d1843d610600fda89daa03e355a/bread_board.png)

- ジャンパワイヤ(Arduinoとブレッドボード等を接続します

![jump wire](https://images.ctfassets.net/jucn867nka4i/1x2zKVab5I6TJ07eSCJ5bO/fa605512fe3993d98299fe3d422dd73e/jump_wire.jpg)

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

![serial port](https://images.ctfassets.net/jucn867nka4i/49avhlkKUegQa0wbqVkzbd/c8ae7f58e584aee9c3fec9bfc34063e1/serial_port.png)

プログラムを書き、保存をしたら
ツール-&gt;ボードを “Arduino/Genuino Uno” (使用しているボード)
ツール-&gt;シリアルポートを 表示されているポートに合わせてください
(WindowsだとCom3など、Macだと/dev/cu.usbmodem1421などのような表示です)

![write](https://images.ctfassets.net/jucn867nka4i/3TvxJtlayApPgApkLPBcfK/0d1ba7cf225bf82342a1c42ea04bdbbc/write.png)

二つを設定したら、左上の矢印ボタンで書き込みができます

![write finish](https://images.ctfassets.net/jucn867nka4i/2LnTlZMPNhJPIQFWuIL645/328df1db515e6e1cc995018f74bd0444/write_finish.png)

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

![serial print](https://images.ctfassets.net/jucn867nka4i/30vCRoG5E4EhFMZLZuORSL/f11adc9a13d408d4df47e202a1149855/serial_print.png)

Arduino IDEのシリアルモニタから送信されたデータを確認

![serial monitor](https://images.ctfassets.net/jucn867nka4i/7mH2u63dgUCDhMVjrBshMz/cafc935de6ab79b110bfe83091c66526/serial_monitor.png)

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

![serial monitor n](https://images.ctfassets.net/jucn867nka4i/LxVRWQkTRubw6BBm6xGcK/a294512d09759cf9f25cc63cea620150/serial_monitor_n.png)

送信されたデータごとに改行がされています
TouchDesignerでSerialを受信する時には、改行記号がデータの最後に付いていると扱いやすいです

### TouchDesignerでSerialを受信

![TD serial DAT](https://images.ctfassets.net/jucn867nka4i/3UruvpOTNYJXN4v6cDshEv/d66629dfd28b2758e975ad63a68c9694/TD_serial_DAT.png)

TDSW_Arduino.toe-&gt;<code>/project1/serial_display</code>
次はシリアルモニタではなくTouchDesigner側でSerialを受信してみましょう
SerialDATを作ります
パラメータでポートを繋いであるArduinoのもの(IDEで出たのと同じもの)
Baud Rate をSerial.begin() で設定した値にします(今回は9600)

その後ActiveをONにするとSerialDATに先程のシリアルモニタど同様の値が来ているのが確認できます

![TD serial DAT 2](https://images.ctfassets.net/jucn867nka4i/2zAqZbcisVyJrUl8ThHF0A/3a212ff0e6f4276797ba8bdafe33c8c0/TD_serial_DAT_2.png)

### 物理ボタンのOnOffをTouchにSerialに送信

TDSW_Arduino.toe-&gt;<code>/project1/button_switching</code>
次は物理的なボタンを用いてTouchDesignerの画像を切り替えてみましょう

- 使用するもの

- タクトスイッチ
- 抵抗(150Ω) (プルダウン抵抗として使用)

![bread board sample1](https://images.ctfassets.net/jucn867nka4i/17Zt4MlUdO5IPS0BsDQzNq/4ab5cd2db9929341ef34ed46de602ae8/bread_board_sample1.png)

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

![TD serial DAT par](https://images.ctfassets.net/jucn867nka4i/7i2zkOv2WadlP7vY4zoWzr/f83471a6b4fdcc89196ddd96207e8a30/TD_serial_DAT_par.png)

![TD network](https://images.ctfassets.net/jucn867nka4i/4EtJztNjFY1hoggORp8Gur/cdc05490c4e936a33053ac8152763040/TD_network.png)

押していない時0、押されている時に1を送るのでその値をTouchDesigner側で利用しましょう
まず最新の値一つしか用いない為SerialDATのMaximum Linesを1にします

- datto-&gt;DAT : null1
- countCHOP-&gt;Limit : Loop Min/Max
- countCHOP-&gt;Limit Maximum : １

![TD DAT](https://images.ctfassets.net/jucn867nka4i/6xS5jRL8iWwI1bqnYWRfcm/7718c48d04feb0cf79ab084e583c4b57/TD_DAT.gif)

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

![bread board acc](https://images.ctfassets.net/jucn867nka4i/3Bm20S0ChdZkvz3XLwTK1M/9dd94b6dde693b7eb300fa773a7e2fc1/bread_board_acc.jpg)

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

![bread board led](https://images.ctfassets.net/jucn867nka4i/5TcV7ffYXbX4dPhzGB82Ds/901b61021373ca3c66f30928c8f0c62c/bread_board_led.png)

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