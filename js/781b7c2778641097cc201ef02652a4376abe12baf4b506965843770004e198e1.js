! function() {
    "use strict";

    function t(t, e) {
        let n;
        return (...i) => {
            clearTimeout(n), n = setTimeout((() => {
                t(...i)
            }), e)
        }
    }
    class e {
        constructor() {
            this.callbacks = [], window.addEventListener("DOMContentLoaded", (() => this.onDOMContentLoaded()))
        }
        onDOMContentLoaded() {
            this.callbacks.sort(((t, e) => t.priority - e.priority)).forEach((({
                callback: t
            }) => t()))
        }
        runOnLoad(t) {
            "loading" === document.readyState ? this.callbacks.push(t) : t.callback()
        }
    }

    function n(t, n = Number.MAX_VALUE) {
        var i;
        (window.canva_scriptExecutor = null !== (i = window.canva_scriptExecutor) && void 0 !== i ? i : new e).runOnLoad({
            callback: t,
            priority: n
        })
    }
    class i {
        constructor(t) {
            this.items = [], this.previousWidth = document.documentElement.clientWidth, this.previousHeight = window.innerHeight;
            const e = t((() => this.onWindowResize()), 100);
            window.addEventListener("resize", e)
        }
        onWindowResize() {
            const t = document.documentElement.clientWidth,
                e = window.innerHeight,
                n = this.previousWidth !== t,
                i = this.previousHeight !== e;
            this.items.forEach((t => {
                const e = () => {
                    t.callback(), t.executed = !0
                };
                (!t.executed || n && t.options.runOnWidthChange || i && t.options.runOnHeightChange) && e()
            })), this.previousWidth = t, this.previousHeight = e
        }
        runOnResize(t, e) {
            this.items.push({
                callback: t,
                options: e,
                executed: e.runOnLoad
            }), this.items.sort(((t, e) => t.options.priority - e.options.priority)), e.runOnLoad && n(t, e.priority)
        }
    }

    function o(e, n, o = t) {
        var s;
        (window.canva_debounceResize = null !== (s = window.canva_debounceResize) && void 0 !== s ? s : new i(o)).runOnResize(e, {
            runOnLoad: !1,
            runOnWidthChange: !0,
            runOnHeightChange: !1,
            priority: Number.MAX_VALUE,
            ...n
        })
    }
    class s {
        constructor() {
            this.menuButton = document.getElementById("menuButton"), this.verticalMenu = document.getElementById("verticalMenu"), this.horizontalMenu = document.getElementById("horizontalMenu"), this.menuToggle = document.getElementById("menuToggle"), this.totalWidth = this.horizontalMenu.clientWidth
        }
        showHamburgerMenu() {
            this.menuButton.style.display = "flex", this.verticalMenu.style.display = "block", this.horizontalMenu.style.display = "none", this.horizontalMenu.style.visibility = "hidden"
        }
        showHorizontalMenu() {
            this.menuButton.style.display = "none", this.verticalMenu.style.display = "none", this.horizontalMenu.style.display = "flex", this.horizontalMenu.style.visibility = "visible"
        }
    }
    n((() => {
        if (!(null != document.getElementById("horizontalMenu"))) return;
        const t = new s;
        window.addEventListener("hashchange", (() => {
            t.menuToggle.checked = !1
        })), o((() => function(t) {
            const e = document.body.clientWidth;
            t.totalWidth > e ? t.showHamburgerMenu() : t.showHorizontalMenu()
        }(t)), {
            runOnLoad: !0
        })
    }))
}();