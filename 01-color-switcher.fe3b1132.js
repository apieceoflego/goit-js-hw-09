let t=null;const e={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]"),bodyRef:document.querySelector("body")};e.btnStart.addEventListener("click",(function(){t=setInterval((()=>{e.bodyRef.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.btnStart.disabled=!0})),e.btnStop.addEventListener("click",(()=>{clearInterval(t),e.btnStart.disabled=!1}));
//# sourceMappingURL=01-color-switcher.fe3b1132.js.map