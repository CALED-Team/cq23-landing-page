/*
Accordion logic
*/
let accordions = document.querySelectorAll(".accordion");
let accordion_states = Array(accordions.length).fill(null);

function update_accordion(accordion_index, tab_index) {
    let acc = accordions.item(accordion_index);

    // remove open tab classes
    acc.querySelectorAll(".tab-open").forEach((element) => {
        element.classList.remove("tab-open");
    });

    // optionally add open tab class
    if (accordion_states[accordion_index] != tab_index) {
        acc.querySelectorAll(".tab").item(tab_index).classList.add("tab-open");
        accordion_states[accordion_index] = tab_index;
    } else {
        accordion_states[accordion_index] = null;
    }
}

accordions.forEach((accordion, acc_index) => {
    accordion.querySelectorAll(".tab-head").forEach((tab, tab_index) => {
        tab.addEventListener("click", () => {
            update_accordion(acc_index, tab_index);
        });
    });
});
