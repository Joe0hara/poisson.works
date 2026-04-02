---
title: "TouchDesigner で Python を使ってみよう！(２)"
description: ""
date: "2020-12-02"
thumbnail: "/images/touchdesigner-python-2.webp"
tags: ["Python", "TouchDesigner"]
---

<div></div>

↑
前記事

では、実際にTouchDesignerの中でPythonを活用させていきましょう！

---

## TouchDesignerでPythonを使う方法

- Textport
- DAT
- Operator Parameters

---

### Textport

(1)で使用したような、書かれたソースコードや表現を逐次解釈しながら実行するものです。
開発していくにあたっては使いにくい。

### DAT

ピンク色のオペレータ、DATを用いることにより、便利に効果的にTouchDesigner内でプログラミングができます。
ソースコードはテキストデータなのでDATで扱うことになります。

### Operator Parameters

![td-python-op-expression](/images/content/td-python-op-expression.webp)

オペレータのパラメータを一行のPythonのScript(Expressionという)として扱うこともできます。

例えばこのように、movie filein TOPもデフォルトでfileというパラメータにExpressionが書かれています。
三つ並んだ小さな四角の真ん中が白っぽく塗られているとExpressionが書かれているということになります。

---

#### よく使うExpression

![td-python-absTime](/images/content/td-python-absTime.webp)

<code>absTime.frame</code>

起動してから経過したFrame数を取得します。
回転し続けさせるのとかに使ったりします。
<code>absTime.seconds</code>で起動してから経過した時間を取得します。

---

![td-python-me-digits](/images/content/td-python-me-digits.webp)

<code>me.digits</code>

名前の最後に付く数字を取得できます。

---

### Text DATでPythonを書く

![td-python-textDAT](/images/content/td-python-textDAT.webp)

textDATを作ったら右下にある十字マークのボタンを押しアクティブな状態します。
そうするとテキストを打ち込めるようになります。

<code>print(&quot;Hello World!&quot;)</code>

と記述したら、アクティブ状態を解除しオペレータを右クリックします。
Run Scriptをクリックします。
何も起きませんが<code>alt+t</code>を押して再びテキストポートを開いてみると、Hello World!と表示されているはずです。

![td-python-textDAT-helloworld](/images/content/td-python-textDAT-helloworld.webp)

![td-python-textport-helloworld](/images/content/td-python-textport-helloworld.webp)

(1)でテキストポート上で一行一行実行していたように、Run ScriptをするとTextDATに書いてあるプログラムが実行されます。
複数行書くと一行目から順番に実行されていきます。これでテキストポート書くと面倒な複数行のプログラムも楽に書くことができました！

---

### オペレータのパラメータにアクセス

![td-python-access-op](/images/content/td-python-access-op.webp)

次に、Pythonスクリプトからオペレータのパラメータにアクセスしてみましょう。
先ほど作ったTextDATの横に、ConstantTOPを作ります。

<code>r = op(&#39;constant1&#39;).par.colorr
print(r)</code>

これでRun Scriptすると、テキストポートに<code>1.0</code>と出力されていると思います。
これはConstant1のcolorRの値を表示しています。
Rの値を変えてみてもう一度Runすると変更した値が表示されるはずです。

パラメータの値を取得する行を詳しく見てみましょう。
<code>op()</code> でオペレータを取得します。
<code>.par</code> でオペレータのパラメータを取得します。
<code>.colorr</code> でパラメータの中のcolorrという値を取得しています。
colorrの部分を変更すると他の変数にもアクセスできます。

![td-python-constantTOP-par](/images/content/td-python-constantTOP-par.webp)

パラメータのこの部分でパラメータ名を確認できます。

次にPythonから値を変更してみましょう。

<code>op(&#39;constant1&#39;).par.alpha = 0.5</code>

これをRunさせるとConstantTOPのアルファが<code>0.5</code>に変わります。
パラメータウィンドウで数値を打ち込むのと同様な処理をPythonから処理できました。

<b>しかし</b>、処理をする度にRun Scriptをしなければならないのは困るので次は自動的にスクリプトを実行させる方法を学びます。

---

### 自動でスクリプトを実行

![td-python-executes](/images/content/td-python-executes.webp)

決まったタイミングでスクリプトを実行させるためのオペレータには、<code>Execute</code>という名前が含まれています。

名前説明
CHOP Execute指定したCHOPの値によってスクリプトを実行DAT Execute指定したDATによってスクリプトを実行Execute起動時や毎Frame時などにスクリプトを実行OP Execute指定したオペレータの名前が変わったり削除された時などにスクリプトを実行Panel Execute指定したPanel(Comp)によってスクリプトを実行Parameter Execute指定したオペレータのパラメータが変化した時などにスクリプトを実行

ExecuteとCHOP Executeを例に説明していきたいと思います。

---

## Execute

Execute DAT は起動時やフレームの開始時などのタイミングで呼び出されるメソッドを持つDATです。

<code>def onFrameStart(frame):
    print(frame)
    return</code>

![td-python-print-frame](/images/content/td-python-print-frame.webp)

このようにメソッド名とreturnで囲まれた中でスクリプトを記述し、ExecuteDATのパラメータでFrame Startを<code>On</code>にします。

このスクリプトは毎フレームのはじめに現在のFrame数をテキストポートに出力するものになっています。
常に行っておきたい処理はこのように記述したり、起動時に実行させたいものはOnStart()の中に書いてあげることで実現できます。

---

### CHOP Execute

CHOP Execute は指定したCHOPの値が変化した時などに実行されるものになっています。
ここで出てくるOnとOffは、0よりも大きいものがOn、0以下のものがOffです。

![td-python-CHOP-execute](/images/content/td-python-CHOP-execute.webp)

では以下のようにButtonCOMP、NullCHOP、CHOPExecute、ConstantTOPを作り、CHOPExecuteの<code>CHOP</code>というパラメータにNull1を入れてください。

以下のようにCHOP Executeに記述し、パラメータのValue ChangeをOnにします。

<code>def onValueChange(channel, sampleIndex, val, prev):
    op(&#39;constant1&#39;).par.alpha = val
    return</code>

これでボタンをぽちぽちと押すとConstantTOPのアルファがボタンの値になります。（Nullの値をそのまま参照させるのと何も変わらないです）

もう少しプログラミングっぽくしてみましょう。
まず、ButtonのTypeをMomentaryに変更し、パラメータの<code>Value Change</code>をOff、<code>Off to On</code>をOnにします。

<code>import random

def onOffToOn(channel, sampleIndex, val, prev):
    op(&#39;constant1&#39;).par.colorr = random.random()
    op(&#39;constant1&#39;).par.colorg = random.random()
    op(&#39;constant1&#39;).par.colorb = random.random()
    return</code>

これで先ほどと同様ボタンをぽちぽちしてみるとConstantTOPの色がランダムで変わります。
このように特定のタイミングのみで値を更新してあげられます。

---

### 外部エディタの使い方

![td-python-external-editor](/images/content/td-python-external-editor.webp)

![td-python-edit-contents](/images/content/td-python-edit-contents.webp)

スクリプトが大きくなってくるとTouchDesigner内でスクリプトを書いていくのが難しくなっていきます。
そこで外部のテキストエディタを使うことができます。
Preferencesを開きDATsの中のText Editorで指定することでそのエディタを使うことが可能になります。

設定したら、編集したいDATを右クリックし、<code>Edit Contents...</code>を選択します。

![td-python-edit-contents-vscode](/images/content/td-python-edit-contents-vscode.webp)

そうするとエディタが起動し、選択していたDATの中身を外部エディタで編集できるようになります。

編集後エディタ上で上書き保存をしTouchDesignerに戻ると変更が反映されています。

---

## Callback関数

OSC In DAT, Serial DAT, Replicator COMPなどを作ると下にくっついてくるDATはCallback DATというものになっています。
Execute系のDAT以外の特定のタイミング、例えばOSCを受信した時に実行されるメソッドなどが記述されています。

Replicatorを例にしてみましょう。
ReplicatorCOMPを作成し、以下のように変更します。

![td-python-callback](/images/content/td-python-callback.webp)

![td-python-constant-master](/images/content/td-python-constant-master.webp)

ConstantTOPを作成しパラメータと名前を以下の通りに変更します。
書かれたExpressionは今までの復習だと思って意味を理解してみてください。

そうするとConstantTOPが<code>Number of Replicants</code>で設定した個数複製されます。
ここまでは普通のReplicatorの使い方です。

では、CallbackDATを使ってみたいと思います。
デフォルトでの中身を見てみるとこのようになっています。

<code>def onReplicate(comp, allOps, newOps, template, master):

    for c in newOps:
        #c.display = True
        #c.render = True
        #c.par.display = 1
        #c.par.clone = comp.par.master
        pass
    return</code>

![td-python-replicate](/images/content/td-python-replicate.webp)

onReplicateからreturnまでに書かれたスクリプトが複製をおこなす時に実行されます。
ではfor文の1行目にある<code>c.display = True</code>の前にある<code>#</code>を消してみましょう。
その後、ReplicatorCOMPの<code>Recreate All Operators</code>の<code>All</code>というボタンを押してください。
複製したオペレータは背景にプレビューする基本的な機能をOnにされて生み出されます。（オペレータの右下にある青丸が押された状態）

このようにCallbackDATの付いたオペレータはより高度な処理をしてあげることが可能になっています。

---

# 最後に

TouchDesignerはプログラムを書かなくても開発できるビジュアルプログラミング環境ですが、プログラムを書くことで、それでしかできないことやオペレータの組み合わせだけでは難しいことを実現できるので覚えておいて損はないはずです!!