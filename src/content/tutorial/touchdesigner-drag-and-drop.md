---
title: "TouchDesigner でのドラッグ&ドロップについて"
description: ""
date: "2019-09-21"
thumbnail: "/images/touchdesigner-drag-and-drop.webp"
tags: ["TouchDesigner", "Python"]
---

## 概要

TouchDesignerでのドラッグアンドドロップについて学んでいきます。

<h5>[公式Wiki](https://docs.derivative.ca/Drag-and-Drop)</h5>

### TouchDesignerでのD&amp;D

#### 読み込み可能ファイルのインポート

![drop movie](/images/content/drop_movie.gif)

ネットワークエディタに対してTouchDesignerで読み取れるファイル形式をドロップすることで対応するオペレータでそのファイルを読み取れるのはよく知られていると思います。

#### オペレータをエクスポート

![drop op](/images/content/drop_op.gif)

ネットワークエディタ上にあるオペレータをデスクトップなどにドロップすると対応するファイル形式で保存されます。

#### ほかのTouchDesignerのネットワークエディタにコピー

![drop tdtotd](/images/content/drop_tdtotd.gif)

サンプルファイルから引っ張ってくるときとかに便利
(なぜか接続切れたところがありますが…)

### Panel Components でのD&amp;D

上記の例はネットワークエディタ上で行えるものですが自分で作ったUIに対しては自分でカスタマイズしてドラッグアンドドロップに対する処理を行うことができます。

#### Drop Script

COMPのドロップスクリプトは他のCOMPやファイルがドロップされたときに実行されます。

#### Drag Script

COMPがドラッグが始まったときに実行されます。

デフォルトでは <code>/sys/drag, /sys/drop</code>になっていますがちょっと解説するには長かったので今回は省略します。

### Setting

![par](/images/content/par.webp)

Containerを作り、パラメータのDrag&amp;Dropのタブで以下のように変更します。

### 取得できる値

#### Drag

args
args[0] ドラッグされたオペレータの名前
args[1] ドラッグされているオペレータのインデックス
args[2] ドラッグされているオペレータの数
args[3] オペレータの種類
args[4] ドラッグされているオペレータの親のパス

#### Drop

args
args[0] ドロップされたNodeの名前、CHOPのチャンネル名またはファイル名（ドロップされたものによる）
args[1] マウスが離されたときのX座標
args[2] マウスが離されたときのY座標
args[3] ドロップされたもののインデックス
args[4] ドロップされたものの総数
args[5] オペレータの種類、又は拡張子
args[6] ネットワークのフルパス、又は
args[7] ドラッグされたCOMP

![DD example](/images/content/DD_example.gif)

drag, drop ともに、<code>print(args)</code>と書き込みドラッグアンドドロップをしてみた例

## 実例

TouchDesignerでUIに動画ファイルやTOXファイルをドラッグアンドドロップして読み込む方法、およびUI上でCOMPをドラッグアンドドロップで操作できるもの

## こんな感じの

![TD dropBank](/images/content/TD_dropBank.gif)

#### ファイル

[TD_DD.zip](https://assets.ctfassets.net/jucn867nka4i/5hD58fJwvVlIzNchdYepy/d9ce429de9d7c22ff61a53b20175f632/TD_DD.zip)

上で学んだD&amp;Dの知識で実現することができます。
ドロップされたファイルの拡張子やパス、Containerの名前などから行う処理を決めています。
Movie、Toxどちらも対応しているBankになっています。