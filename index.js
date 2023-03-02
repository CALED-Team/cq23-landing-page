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

/*
Schedule tabs logic
*/
document.querySelectorAll(".schedule").forEach((schedule_element) => {
    schedule_element
        .querySelectorAll(".schedule-tab")
        .forEach((tab, tab_index) => {
            tab.addEventListener("click", () => {
                schedule_element
                    .querySelectorAll(".schedule-tab-content")
                    .forEach((element, index) => {
                        element.classList.remove("schedule-content-active");
                        if (index == tab_index) {
                            element.classList.add("schedule-content-active");
                        }
                    });
                schedule_element
                    .querySelectorAll(".schedule-tab")
                    .forEach((element, index) => {
                        element.classList.remove("schedule-tab-active");
                        if (index == tab_index) {
                            element.classList.add("schedule-tab-active");
                        }
                    });
            });
        });
});

/*
Image gallery carousel logic
*/
let gallery_moving_interval_ids = [];
document
    .querySelectorAll(".gallery")
    .forEach((gallery_element, gallery_index) => {
        const num_items =
            gallery_element.querySelectorAll(".gallery-image img").length;

        const select_index = (item_index) => {
            gallery_element
                .querySelectorAll(".gallery-image img")
                .forEach((element, index) => {
                    element.classList.remove("active-image");
                    if (index == item_index) {
                        element.classList.add("active-image");
                    }
                });
            gallery_element
                .querySelectorAll(".gallery-image-select li")
                .forEach((element, index) => {
                    element.classList.remove("active-image");
                    if (index == item_index) {
                        element.classList.add("active-image");
                    }
                });
        };

        // create click event listeners for the bullet points at the bottom
        gallery_element
            .querySelectorAll(".gallery-image-select li")
            .forEach((tab, tab_index) => {
                tab.addEventListener("click", () => {
                    clearInterval(gallery_moving_interval_ids[gallery_index]);
                    select_index(tab_index);
                });
            });

        const find_active_index = () => {
            let items = gallery_element.querySelectorAll(
                ".gallery-image-select li"
            );
            for (let i = 0; i < items.length; i++) {
                if (items.item(i).classList.contains("active-image")) {
                    return i;
                }
            }
        };

        const next_item = () => {
            let active_index = find_active_index();
            let new_active_index = (active_index + 1) % num_items;
            select_index(new_active_index);
        };

        const previous_item = () => {
            let active_index = find_active_index();
            let new_active_index = (active_index - 1 + num_items) % num_items;
            select_index(new_active_index);
        };

        // add click handlers to the arrows
        gallery_element
            .querySelector(".left-arrow")
            .addEventListener("click", () => {
                clearInterval(gallery_moving_interval_ids[gallery_index]);
                previous_item();
            });
        gallery_element
            .querySelector(".right-arrow")
            .addEventListener("click", () => {
                clearInterval(gallery_moving_interval_ids[gallery_index]);
                next_item();
            });

        gallery_moving_interval_ids.push(setInterval(next_item, 3000));
    });


/*
Registration popup logic
*/
document.querySelectorAll(".registration-btn").forEach((element) => {
    element.addEventListener("click", (event) => {
        document.querySelector(".popup-bg").classList.remove("popup-closed");
        event.preventDefault();
    })
})

document.querySelectorAll(".popup-close").forEach((element) => {
    element.addEventListener("click", () => {
        document.querySelector(".popup-bg").classList.add("popup-closed");
    })
})

document.querySelector(".popup-content").onclick = (event) => event.stopPropagation()
