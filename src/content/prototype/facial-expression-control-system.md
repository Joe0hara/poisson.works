---
title: "Facial Expression Control System"
description: ""
date: "2023-05-03"
thumbnail: "/images/facial-expression-control-system.webp"
tags: ["TouchDesigner", "Python"]
---

### Vtuberの表情をXBOXコントローラと音声から制御するシステム

表情のプリセットと瞬きの制御をXboxコントローラから、モデルの口の動きをマイクからの音声をリアルタイムに母音と声量を解析したデータを反映させています

多くのVtuberの口の動きにはOculusの提供しているUnityプラグインが使用されています
しかし、UnrealEngineやその他環境で動作させる際には、Unityで書き出したソフトウェアからデータを出力する以外の方法がなくなってしまします
そういったソフトウェア依存をなくすためにPythonで音声処理の実装をしました

デバイスの取り回しとGUIの表示の簡易化のためにTouchDesignerをもちいました
ただPythonのコードのみでの実装も可能となっています