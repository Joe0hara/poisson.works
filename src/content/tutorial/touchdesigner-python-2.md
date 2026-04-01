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

![td-python-op-expression](https://images.ctfassets.net/jucn867nka4i/6X6x1ioC3uB2t7Skk0j86X/27e615415e8cde7bb24aa4b49049202f/td-python-op-expression.png)

オペレータのパラメータを一行のPythonのScript(Expressionという)として扱うこともできます。

例えばこのように、movie filein TOPもデフォルトでfileというパラメータにExpressionが書かれています。
三つ並んだ小さな四角の真ん中が白っぽく塗られているとExpressionが書かれているということになります。

---

#### よく使うExpression

![td-python-absTime](https://images.ctfassets.net/jucn867nka4i/3ZylqA9LhIuu9J6KYvtZVI/f98914971a70c0682970bce86231b5a9/td-python-absTime.png)

<code>absTime.frame</code>

起動してから経過したFrame数を取得します。
回転し続けさせるのとかに使ったりします。
<code>absTime.seconds</code>で起動してから経過した時間を取得します。

---

![td-python-me-digits](https://images.ctfassets.net/jucn867nka4i/6dXVuYycOY5th6EJdkBidz/e78fcdfe2ed585a581b4419805a841d5/td-python-me-digits.png)

<code>me.digits</code>

名前の最後に付く数字を取得できます。

---

### Text DATでPythonを書く

![td-python-textDAT](https://images.ctfassets.net/jucn867nka4i/bDDQUW39SE0PY09C2EQfI/cb45b04fc8ba6dfb92c7fad3daa5218c/td-python-textDAT.png)

textDATを作ったら右下にある十字マークのボタンを押しアクティブな状態します。
そうするとテキストを打ち込めるようになります。

<code>print(&quot;Hello World!&quot;)</code>

と記述したら、アクティブ状態を解除しオペレータを右クリックします。
Run Scriptをクリックします。
何も起きませんが<code>alt+t</code>を押して再びテキストポートを開いてみると、Hello World!と表示されているはずです。

![td-python-textDAT-helloworld](https://images.ctfassets.net/jucn867nka4i/6X4GliIUqGBmV4E4UGKFoW/28a97378b5973577892d9de26d97f925/td-python-textDAT-helloworld.png)

![td-python-textport-helloworld](https://images.ctfassets.net/jucn867nka4i/1pnTglSRRqxgxAoIoU9a0w/51cd180bbe3d23ba4ce6f781d56eda9a/td-python-textport-helloworld.png)

(1)でテキストポート上で一行一行実行していたように、Run ScriptをするとTextDATに書いてあるプログラムが実行されます。
複数行書くと一行目から順番に実行されていきます。これでテキストポート書くと面倒な複数行のプログラムも楽に書くことができました！

---

### オペレータのパラメータにアクセス

![td-python-access-op](https://images.ctfassets.net/jucn867nka4i/6wyYHVPeUtgk6Oo7Rq3wVL/31b871f4f2a33a8d66e50c0ff5df8f89/td-python-access-op.png)

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

![td-python-constantTOP-par](https://images.ctfassets.net/jucn867nka4i/6yw7R3vF8WItFx90T1JpS1/fe95bbecc8e88b9f8351b45619df2f9e/td-python-constantTOP-par.png)

パラメータのこの部分でパラメータ名を確認できます。

次にPythonから値を変更してみましょう。

<code>op(&#39;constant1&#39;).par.alpha = 0.5</code>

これをRunさせるとConstantTOPのアルファが<code>0.5</code>に変わります。
パラメータウィンドウで数値を打ち込むのと同様な処理をPythonから処理できました。

<b>しかし</b>、処理をする度にRun Scriptをしなければならないのは困るので次は自動的にスクリプトを実行させる方法を学びます。

---

### 自動でスクリプトを実行

![td-python-executes](https://images.ctfassets.net/jucn867nka4i/5pIFzmBWXo097nSAFfZB1i/db6ef253cdd1cafc58c175cdc7970591/td-python-executes.png)

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

![td-python-print-frame](https://images.ctfassets.net/jucn867nka4i/44fpCmQF3EDuvoxiptQtQx/a4b3bc0e3e560c1a2d1411fee414f157/td-python-print-frame.png)

このようにメソッド名とreturnで囲まれた中でスクリプトを記述し、ExecuteDATのパラメータでFrame Startを<code>On</code>にします。

このスクリプトは毎フレームのはじめに現在のFrame数をテキストポートに出力するものになっています。
常に行っておきたい処理はこのように記述したり、起動時に実行させたいものはOnStart()の中に書いてあげることで実現できます。

---

### CHOP Execute

CHOP Execute は指定したCHOPの値が変化した時などに実行されるものになっています。
ここで出てくるOnとOffは、0よりも大きいものがOn、0以下のものがOffです。

![td-python-CHOP-execute](https://images.ctfassets.net/jucn867nka4i/19Y0QUoHe2D7QoYeYcL8Sg/96e2788d5eb35b98e80f26c250b04c62/td-python-CHOP-execute.png)

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

![td-python-external-editor](https://images.ctfassets.net/jucn867nka4i/1MEHRvkfih8zF9a1wTvPt2/519039b246080913af6f9c5d20e39987/td-python-external-editor.png)

![td-python-edit-contents](https://images.ctfassets.net/jucn867nka4i/2a8MlOV98PIArngOmDk82C/19fd99c8c9ad6ce6f58ccf621c622218/td-python-edit-contents.png)

スクリプトが大きくなってくるとTouchDesigner内でスクリプトを書いていくのが難しくなっていきます。
そこで外部のテキストエディタを使うことができます。
Preferencesを開きDATsの中のText Editorで指定することでそのエディタを使うことが可能になります。

設定したら、編集したいDATを右クリックし、<code>Edit Contents...</code>を選択します。

![td-python-edit-contents-vscode](https://images.ctfassets.net/jucn867nka4i/H79bdrL429zyJHACioaBr/14707cc0714c69e9ac0f6aad7eaef452/td-python-edit-contents-vscode.png)

そうするとエディタが起動し、選択していたDATの中身を外部エディタで編集できるようになります。

編集後エディタ上で上書き保存をしTouchDesignerに戻ると変更が反映されています。

---

## Callback関数

OSC In DAT, Serial DAT, Replicator COMPなどを作ると下にくっついてくるDATはCallback DATというものになっています。
Execute系のDAT以外の特定のタイミング、例えばOSCを受信した時に実行されるメソッドなどが記述されています。

Replicatorを例にしてみましょう。
ReplicatorCOMPを作成し、以下のように変更します。

![td-python-callback](https://images.ctfassets.net/jucn867nka4i/1Sb8USfvRgMDzPvenDgs5L/764292dd72f3d6ab0e4681b624dd43f3/td-python-callback.png)

![td-python-constant-master](https://images.ctfassets.net/jucn867nka4i/2k0JgZZmJDZ3XelgGplxWM/16cbf7ba3673707c216744f095df1688/td-python-constant-master.png)

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

![td-python-replicate](https://images.ctfassets.net/jucn867nka4i/bzWVcKOtJBGFOW24BXevS/00ac26aaf0abecd75a85a2c40a57f75e/td-python-replicate.png)

onReplicateからreturnまでに書かれたスクリプトが複製をおこなす時に実行されます。
ではfor文の1行目にある<code>c.display = True</code>の前にある<code>#</code>を消してみましょう。
その後、ReplicatorCOMPの<code>Recreate All Operators</code>の<code>All</code>というボタンを押してください。
複製したオペレータは背景にプレビューする基本的な機能をOnにされて生み出されます。（オペレータの右下にある青丸が押された状態）

このようにCallbackDATの付いたオペレータはより高度な処理をしてあげることが可能になっています。

---

# 最後に

TouchDesignerはプログラムを書かなくても開発できるビジュアルプログラミング環境ですが、プログラムを書くことで、それでしかできないことやオペレータの組み合わせだけでは難しいことを実現できるので覚えておいて損はないはずです!!