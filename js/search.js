(function () {
    function t(t) {
        if (r) t(r);
        else {
            var e = new XMLHttpRequest;
            e.open("GET", g, !0), e.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    var e = JSON.parse(this.response);
                    r = e instanceof Array ? e : e.posts, t(r)
                } else console.error(this.statusText)
            }, e.onerror = function () {
                console.error(this.statusText)
            }, e.send()
        }
    }
    function e(t, e) {
        return t.replace(/\{\w+\}/g, function (t) {
            var n = t.replace(/\{|\}/g, "");
            return e[n] || ""
        })
    }
    function n(t) {
        var n = "";
        n = t.length ? t.map(function (t) {
            return e(v, {
                title: t.title,
                path: (o.BLOG.ROOT + "/" + t.path).replace(/\/{2,}/g, "/"),
                date: new Date(t.date).toLocaleDateString(),
                tags: t.tags.map(function (t) {
                    return "<span>#" + t.name + "</span>"
                }).join("")
            })
        }).join("") : '<li class="tips"><i class="icon icon-coffee icon-3x"></i><p>Results not found!</p></li>', L.innerHTML =
            n
    }
    function i(t, e) {
        return e.lastIndex = 0, e.test(t)
    }
    function s(t, e) {
        return i(t.title, e) || t.tags.some(function (t) {
            return i(t.name, e)
        }) || i(t.text, e)
    }
    function a(e) {
        var i = this.value.trim();
        if (i) {
            var a = new RegExp(i.replace(/[ ]/g, "|"), "gmi");
            t(function (t) {
                var e = t.filter(function (t) {
                    return s(t, a)
                });
                n(e), w.show()
            }), e.preventDefault()
        }
    }
    var r, o = window || this,
        c = o.BLOG.even,
        l = o.BLOG.$,
        u = l("#search"),
        f = l("#search-wrap"),
        d = l("#key"),
        p = l("#back"),
        h = l("#search-panel"),
        L = l("#search-result"),
        v = l("#search-tpl").innerHTML,
        g = (o.BLOG.ROOT + "/content.json").replace(/\/{2}/g, "/"),
        m = o.BLOG.noop,
        O = l("html"),
        w = {
            show: function () {
                o.innerWidth < 760 ? O.classList.add("lock-size") : m, h.classList.add("in")
            },
            hide: function () {
                o.innerWidth < 760 ? O.classList.remove("lock-size") : m, h.classList.remove("in")
            }
        };
    u.addEventListener(c, function () {
        f.classList.toggle("in"), d.value = "", f.classList.contains("in") ? d.focus() : d.blur()
    }), p.addEventListener(c, function () {
        f.classList.remove("in"), w.hide()
    }), document.addEventListener(c, function (t) {
        "key" !== t.target.id && "click" === c && w.hide()
    }), d.addEventListener("input", a), d.addEventListener(c, a)
}).call(this);