(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/pxt-atisa/",
    "verprefix": "",
    "workerjs": "/pxt-atisa/worker.js",
    "monacoworkerjs": "/pxt-atisa/monacoworker.js",
    "gifworkerjs": "/pxt-atisa/gifjs/gif.worker.js",
    "serviceworkerjs": "/pxt-atisa/serviceworker.js",
    "typeScriptWorkerJs": "/pxt-atisa/tsworker.js",
    "pxtVersion": "12.1.8",
    "pxtRelId": "localDirRelId",
    "pxtCdnUrl": "/pxt-atisa/",
    "commitCdnUrl": "/pxt-atisa/",
    "blobCdnUrl": "/pxt-atisa/",
    "cdnUrl": "/pxt-atisa/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "maker",
    "simUrl": "/pxt-atisa/simulator.html",
    "simserviceworkerUrl": "/pxt-atisa/simulatorserviceworker.js",
    "simworkerconfigUrl": "/pxt-atisa/workerConfig.js",
    "partsUrl": "/pxt-atisa/siminstructions.html",
    "runUrl": "/pxt-atisa/run.html",
    "docsUrl": "/pxt-atisa/docs.html",
    "multiUrl": "/pxt-atisa/multi.html",
    "asseteditorUrl": "/pxt-atisa/asseteditor.html",
    "isStatic": true,
    "kioskUrl": "/pxt-atisa/kiosk.html",
    "teachertoolUrl": "/pxt-atisa/teachertool.html",
    "tutorialtoolUrl": "/pxt-atisa/tutorialtool.html",
    "skillmapUrl": "/pxt-atisa/skillmap.html",
    "multiplayerUrl": "/pxt-atisa/multiplayer.html",
    "authcodeUrl": "/pxt-atisa/authcode.html"
};

    var scripts = [
        "/pxt-atisa/highlight.js/highlight.pack.js",
        "/pxt-atisa/marked/marked.min.js",
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/pxt-atisa/jquery.js")
    if (typeof jQuery == "undefined" || !jQuery.prototype.sidebar)
        scripts.push("/pxt-atisa/semantic.js")
    if (!window.pxtTargetBundle)
        scripts.push("/pxt-atisa/target.js");
    scripts.push("/pxt-atisa/pxtembed.js");

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.setInitCallbacks(pxtCallbacks)
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
