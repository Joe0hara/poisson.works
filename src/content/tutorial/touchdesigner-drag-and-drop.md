---
title: "TouchDesigner でのドラッグ&ドロップについて"
description: ""
date: "2019-09-21"
thumbnail: "/images/touchdesigner-drag-and-drop.jpg"
tags: ["TouchDesigner", "Python"]
---

## 概要

TouchDesignerでのドラッグアンドドロップについて学んでいきます。

<h5>[公式Wiki](https://docs.derivative.ca/Drag-and-Drop)</h5>

### TouchDesignerでのD&amp;D

#### 読み込み可能ファイルのインポート

![drop movie](https://images.ctfassets.net/jucn867nka4i/2iAz6w61gys6ZR76Cl8ny3/7c6e170adee6462183e0824fff2b9e23/drop_movie.gif)

ネットワークエディタに対してTouchDesignerで読み取れるファイル形式をドロップすることで対応するオペレータでそのファイルを読み取れるのはよく知られていると思います。

#### オペレータをエクスポート

![drop op](https://images.ctfassets.net/jucn867nka4i/2tsr25CLnFLsFdfUsRu3yU/ef96b04f0d39104537779b9a16884de1/drop_op.gif)

ネットワークエディタ上にあるオペレータをデスクトップなどにドロップすると対応するファイル形式で保存されます。

#### ほかのTouchDesignerのネットワークエディタにコピー

![drop tdtotd](https://images.ctfassets.net/jucn867nka4i/6DhKQnH3b3EVSO5TnQwCUn/a93666720ac1af4238ad00debeb1d3f5/drop_tdtotd.gif)

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

![par](https://images.ctfassets.net/jucn867nka4i/6RYzZsPtlzlILeNOTkWw1B/b8c780d689cd431162d3e65c573bf744/par.jpg)

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

![DD example](https://images.ctfassets.net/jucn867nka4i/17NsOHdTi0zPtTZ5mfHi5t/7de9645572126cbb144ac9131b48f0ed/DD_example.gif)

drag, drop ともに、<code>print(args)</code>と書き込みドラッグアンドドロップをしてみた例

## 実例

TouchDesignerでUIに動画ファイルやTOXファイルをドラッグアンドドロップして読み込む方法、およびUI上でCOMPをドラッグアンドドロップで操作できるもの

## こんな感じの

![TD dropBank](https://images.ctfassets.net/jucn867nka4i/7vh7SeDbAKgvth73Jrr2uY/078ad7aa50c4b7e79dd993c54a5c8a8c/TD_dropBank.gif)

#### ファイル

[TD_DD.zip](https://assets.ctfassets.net/jucn867nka4i/5hD58fJwvVlIzNchdYepy/d9ce429de9d7c22ff61a53b20175f632/TD_DD.zip)

上で学んだD&amp;Dの知識で実現することができます。
ドロップされたファイルの拡張子やパス、Containerの名前などから行う処理を決めています。
Movie、Toxどちらも対応しているBankになっています。