---
title: "TouchDesigner で Python を使ってみよう！(１)"
description: ""
date: "2020-12-01"
thumbnail: "/images/touchdesigner-python-1.jpg"
tags: ["TouchDesigner", "Python"]
---

## はじめに

TouchDesignerというビジュアルプログラミング環境を用いてPython入門、
およびTouchDesignerでどのようにPythonを使っていくかを書いていきたいと思います。

---

## Pythonとは

> 文法を極力単純化してコードの可読性を高め、読みやすく、また書きやすくしてプログラマの作業性とコードの信頼性を高めることを重視してデザインされた、汎用の高水準言語である。

Wikipediaより

## バージョン

Pythonはバージョン２系と３系が存在しますが、TouchDesignerはバージョン３系となっています。

ここで確認できます。

---

## 準備

TouchDesignerを起動し <b>alt+t</b> でテキストポートを開きます。
（黒いウィンドウ）

この回ではテキストポートでPythonの文法などを学んでいきます。
TouchDesignerでの使い方のみを学びたい方は[（２）](https://poisson.work/tutorial/touchdesigner/touchdesigner-%e3%81%a7-python-%e3%82%92%e4%bd%bf%e3%81%a3%e3%81%a6%e3%81%bf%e3%82%88%e3%81%86%ef%bc%81%ef%bc%92/)にお進みください。

---

## 基本文法

---

## “Hello World”

まずは文字列を表示してみましょう！
実行文を記述してEnterキーを押すと、実行結果が次の行に表示されます。

<code>&gt;&gt;&gt; print(&quot;Hello World&quot;)
Hello World</code>

こんな感じ
<code>python &gt;&gt;&gt;</code> というのが行のはじめに出てきます。解説では<code>&gt;&gt;&gt;</code>のみに省略いたします。
（テキストポートの場合のみ print すらも省略できてしまいます）

---

## 数値演算

数値演算をしていきます。

<code>&gt;&gt;&gt; print(3+5)
8</code>

演算子演算例　答
+ 加算 1+1 2
– 減算 5-3 2
* 乗算 2*3 6
/ 除算9/2 4.5
// 除算（整数部のみ）9//2 4
% 剰余5%3 2
** べき乗2**3 8

先に計算して欲しいものは () で囲います。

---

## 変数

変数とは値を格納しておく箱のようなものです。

<code>&gt;&gt;&gt; a = 1
&gt;&gt;&gt; print(a)
1</code>

値を更新することもできます

<code>&gt;&gt;&gt; print(a)
1
&gt;&gt;&gt; a = 2
&gt;&gt;&gt; print(a)
2</code>

また、今の値に数値を足したりもできます

<code>&gt;&gt;&gt; a = 1
&gt;&gt;&gt; a = a + 10
&gt;&gt;&gt; print(a)
11</code>

---

## 型

Pythonは動的型付け言語です
変数に型を指定しなくても動的に型が付けられます

型名-例
str - “Hello World!” , “2”
int - 2, 100
float - 3.14, -0.01
bool - True, False
list - [“りんご”, “みかん”], [2,3,5,7]

<code>&gt;&gt;&gt; print(type(1))
&lt;class &#39;int&#39;&gt;
&gt;&gt;&gt; print(type(&quot;1&quot;))
&lt;class &#39;str&#39;&gt;</code>

このようにtype()でかっこの中にあるオブジェクトの型を確認することができます。

---

## 比較演算子

値の比較をするものになります
条件が一致した場合True, 不一致の場合Falseを返します

比較演算子記述例意味
== x == y xとyが等しい
!= x != y xとyが異なる
&gt;x &gt; yxがyより大きい
&gt;=x &gt;= yxがy以上
&lt;x &lt; yxがy未満
&lt;=x &lt;= yxがy以下
is x is yxとyのオブジェクトそのものの同一性を比較（省略）

<code>&gt;&gt;&gt; print(1==1)
True
&gt;&gt;&gt; print(1!=1)
False</code>

---

## 論理演算子

値を論理演算します
こちらも条件にあった場合True、不一致の場合Falseを

論理演算子記述例意味
or A or BA または B が真
and A and BA と B が真
not not AA の真偽値を反転

<code>&gt;&gt;&gt; A = True
&gt;&gt;&gt; B = False

&gt;&gt;&gt; print(A or B)
True
&gt;&gt;&gt; print(A and B)
False
&gt;&gt;&gt; print(not A)
false</code>

---

## 条件分岐(if – else)

条件によって処理を変える時に用います

<code>&gt;&gt;&gt; a = 1
&gt;&gt;&gt; if a &gt; 0:
...     print(True)   #条件式がTrueの時に実行
... else:
...     print(False)  #条件式がFalseの時に実行
...
True</code>

ここで、今までは一行で済んでいましたがコードが複数行になりました。
if文などは次に文が続くため、改行をしても即座に実行されません。
最後に空白の行を改行すると実行されます。

---

## 複合文

if文やfor文などの複数の文からなる処理グループです。
Pythonの最大の特徴は、「インデントの深さで複合文のブロック範囲を決定」することです。
他言語では括弧やbegin-endによる範囲指定を採用しているのに対して、この方式は特殊です。
複合文のキーワード（ifなど）の後にコロン( : )が付き、その後、同じ数の空白でインデントされた文がブロックとみなされます。
インデントは基本スペース4つを使うことが推奨されています。

<code>a = 1
if a &gt; 0:
    print(True)   #if文のブロック
else:
    print(False)  #else文のブロック</code>

このようにブロックを入れ子にすることもできます

<code>A = True
B = False

if A:
    if B:
        print(&quot;A:True, B:True&quot;)
    else:
        print(&quot;A:True, B:False&quot;)    #このブロックが実行される
else:
    if B:
        print(&quot;A:False, B:True&quot;)
    else:
        print(&quot;A:False, B:False&quot;)</code>

---

## 繰り返し(for)

リストなどの要素が複数あるオブジェクトを順に取り出していく処理になります。

<code>&gt;&gt;&gt; for fruit in [&quot;apple&quot;, &quot;orange&quot;, &quot;banana&quot;]:
...    print(fruit)
...
apple
orange
banana&gt;&gt;&gt; for i in range(3):    
...    print(i)
...
0
1
2</code>

range(x)は、0からx（整数値）までのリストを作ってくれます　この例だと[0,1,2]

---

## 繰り返し(while)

while文は条件式がTrueの間ループ処理を続け、Falseになったところでループが終了します。

<code>&gt;&gt;&gt; x = 3
&gt;&gt;&gt; while x &gt; 0:
...    print(x)
...    x = x - 1

3
2
1</code>

---

## モジュール

他のファイルからプログラムを再利用できるようにしたものを「モジュール｣と言います。
自分で作るモジュールの他にもデフォルトで組み込まれている「組み込みモジュール｣などがあります。
ここではデフォルトで組み込まれているモジュールを使っていきたいと思います。

今回使用するモジュールは math というモジュールになります。
使い方は簡単です。
プログラムのはじめに

import math

と記述するだけになります。

<code>import math

&gt;&gt;&gt; print(math.pi)
3.141592653589793
&gt;&gt;&gt; print(math.cos(0))
1.0</code>

このような使い方になります。

---

またよく使うものに random モジュールというものがあります。

<code>import random

&gt;&gt;&gt; print(random.random())    #0.0~1.0の範囲のfloat型のランダムな値を返します
0.7607203658655518

&gt;&gt;&gt; print(random.uniform(3.0, 10.0))    #任意の幅のランダムなfloat値を返す
7.411074375066043

&gt;&gt;&gt; print(random.randint(10, 100))    #任意の幅のランダムな整数値を返す
66</code>

---

ここまででPythonの基本文法を学びました！（他にも色々基礎的なことはありますが）
次はTouchDesignerでの活用方法を学びましょう！

<div></div>