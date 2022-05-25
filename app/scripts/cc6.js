let CC6_DATA;

document.addEventListener("DOMContentLoaded", function () {
  init().then(() => {
    document.getElementById('mainContainer').style.removeProperty('display');
    document.getElementById('spinnerContainer').style.setProperty('display', 'none');
  });
});

async function init() {
  attachEventHandlers();
  CC6_DATA = await getCC6Form();
  addDataToForm();
}

function attachEventHandlers() {
  document.getElementById('submitCC6').addEventListener('click', (e) => {
    e.preventDefault();
    onFormClicked();
  })
}

function onFormClicked() {
  const formData = {
    "601": document.getElementById('601').value,
    "602": document.getElementById('602').value,
    "603": document.getElementById('603').value,
    "604": document.getElementById('604').value,
    "605": document.getElementById('605').value,
  };
  const putData = { ...CC6_DATA, ...formData };
  putCC6Form(putData).then(() => {
    console.info('put succeed');
  });
}

function addDataToForm() {
  document.getElementById('601').value = CC6_DATA['601'];
  document.getElementById('602').value = CC6_DATA['602'];
  document.getElementById('603').value = CC6_DATA['603'];
  document.getElementById('604').value = CC6_DATA['604'];
  document.getElementById('605').value = CC6_DATA['605'];
}
