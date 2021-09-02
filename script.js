const btn = document.querySelectorAll('.btn');
const result = document.querySelector('.calculator-result');


for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', () => {
        // result.textContent = btn[i].textContent;
        result.insertAdjacentHTML('beforeend', btn[i].textContent);
    })
};

btn[0].addEventListener('click', () => result.textContent = '');
btn[1].addEventListener('click', () => console.log(1))