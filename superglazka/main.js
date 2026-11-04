(function () {
  var buttons = document.querySelectorAll("[data-copy-target]");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var source = document.getElementById(button.getAttribute("data-copy-target"));
      var status = document.getElementById(button.getAttribute("data-status"));
      if (!source) return;

      var text = "value" in source ? source.value : source.textContent;

      function report(message) {
        if (status) status.textContent = message;
      }

      function fallback() {
        source.focus();
        if (typeof source.select === "function") source.select();
        var copied = false;
        try {
          copied = document.execCommand("copy");
        } catch (error) {
          copied = false;
        }
        report(
          copied
            ? "Скопировано в буфер обмена."
            : "Автокопирование недоступно. Текст выделен — скопируйте его вручную."
        );
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(
          function () {
            report("Скопировано в буфер обмена.");
          },
          fallback
        );
      } else {
        fallback();
      }
    });
  });
})();
