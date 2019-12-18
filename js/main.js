class detailSelect {
    constructor(container) {
        this.container = document.querySelector(container);
        this.options = document.querySelectorAll(`${container} > .select > .select__option`);
        this.value = this.container.querySelector('summary').textContent;
        this.mouseDown = false;
        this._addEventListeners();
        this._setAria();
        this.updateValue();
    }
    _addEventListeners() {
        this.container.addEventListener('toggle', () => {
            if (this.container.open) return;
            this.updateValue();
        });

        this.container.addEventListener('focusout', e => {
            if (this.mouseDown) return;
            this.container.removeAttribute('open');
        });

        this.options.forEach(opt => {
            opt.addEventListener('mousedown', () => {
                this.mouseDown = true;
            });
            opt.addEventListener('mouseup', () => {
                this.mouseDown = false;
                this.container.removeAttribute('open');
            })
        });

        this.container.addEventListener('keyup', e => {
            const keycode = e.which;
            const current = [...this.options].indexOf(this.container.querySelector('.active'));
            switch (keycode) {
                case 27: // ESC
                    this.container.removeAttribute('open');
                    break;
                case 35: // END
                    e.preventDefault();
                    if (!this.container.open) this.container.setAttribute('open', '');
                    this.setChecked(this.options[this.options.length - 1].querySelector('input'))
                    break;
                case 36: // HOME
                    e.preventDefault();
                    if (!this.container.open) this.container.setAttribute('open', '');
                    this.setChecked(this.options[0].querySelector('input'))
                    break;
                case 38: // UP
                    e.preventDefault();
                    if (!this.container.open) this.container.setAttribute('open', '');
                    this.setChecked(this.options[current > 0 ? current - 1 : 0].querySelector('input'));
                    break;
                case 40: // DOWN
                    e.preventDefault();
                    if (!this.container.open) this.container.setAttribute('open', '');
                    this.setChecked(this.options[current < this.options.length - 1 ? current + 1 : this.options.length - 1].querySelector('input'));
                    break;
            }
        })
    }

    _setAria() {
        this.container.setAttribute('aria-haspopup', 'listbox');
        const selectBox = this.container.querySelector('.select');
        selectBox.setAttribute('role', 'listbox');
        selectBox.querySelector('[type=radio]').setAttribute('role', 'option')
    }

    updateValue(e) {
        const that = this.container.querySelector('input:checked');
        if (!that) return;
        this.setValue(that)
    }

    setChecked(that) {
        that.checked = true;
        this.setValue(that)
    }

    setValue(that) {
        if (this.value === that.value) return;

        this.container.querySelector('summary').textContent = that.parentNode.textContent;
        this.value = that.value;

        this.options.forEach(opt => {
            opt.classList.remove('active');
        });
        that.parentNode.classList.add('active');

        this.container.dispatchEvent(new Event('change'));
    }
}

const details = new detailSelect('#example_select');


let range = document.querySelector('.range');
let rangeFill = document.querySelector('.border');

range.addEventListener('input', fillRange);
 function fillRange() {
     rangeFill.style.width = (100 - range.value) + '%'
 }
fillRange();

let navBlock = document.querySelector(".nav-wrap");
let mainNav = document.querySelector(".main-nav");

mainNav.addEventListener("click",  mobileMenu);


function mobileMenu(e) {
    navBlock.classList.toggle("visible");
    let active = navBlock.querySelector('.active');
        if(e.target.classList.contains('nav-link')){
            active.classList.remove('active');
            e.stopPropagation();
        e.target.classList.add('active')
    }
};

let inputsArr = document.querySelectorAll('.input-custom');
function hasValueInput(){
    inputsArr.forEach(input => {
        if(input.value){
            input.nextElementSibling.classList.add('focused-label');
        }
    })

}
hasValueInput();
