const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((json) => displayShow(json.data));
};

const displayShow = (lessons) => {
  const btnContainer = document.getElementById('btn-container');
  btnContainer.innerHTML = '';

  for (let lesson of lessons) {
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
                  <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
                    ><i class="fa-solid fa-circle-question"></i> Lesson - ${lesson.level_no}
                    </button>
    `;
    btnContainer.append(btnDiv);
  }
};
loadLessons();

const removeActBtn = () => {
  const lessonButtons = document.querySelectorAll('.lesson-btn');
  lessonButtons.forEach((btn) => btn.classList.remove('active'));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActBtn();
      const lessonButton = document.getElementById(`lesson-btn-${id}`);
      lessonButton.classList.add('active');
      displayShowCard(data.data);
    });
};

const displayShowCard = (words) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  if (words.length === 0) {
    cardContainer.innerHTML = `
            <div class="space-y-4 col-span-full my-7">
              <img src="./assets/alert-error.png" alt="" class="mx-auto" />
              <p
                class="text-lg font-normal font-bangla text-[#18181B] text-center"
                >এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p
              >
              <h2
                class="text-4xl font-bold font-bangla text-[#000000] text-center"
                >নেক্সট Lesson এ যান</h2
              >
            </div>
    `;
  }

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement('div');
    card.innerHTML = `
           <div class="bg-white p-11 rounded-3xl text-center space-y-5">
              <h3 class="text-3xl font-bold text-black">${
                word.word ? word.word : 'Not Found'
              }</h3>
              <p class="text-xl font-medium text-[#18181B]"
                >Meaning / Pronouciation</p
              >
              <h2 class="text-3xl font-semibold font-bangla text-[#18181B]"
                >${word.meaning ? word.meaning : 'পাওয়া যায় নাই'} / ${
      word.pronunciation ? word.pronunciation : 'পাওয়া যায় নাই'
    }</h2
              >
              <div class="flex justify-between items-center mt-10">
                <button onclick="my_modal_5.showModal()" class="btn bg-[#1a90ff21] border-0 hover:bg-[#1a90ff80]"
                  ><i class="fa-solid fa-circle-info"></i
                ></button>
                <button class="btn bg-[#1a90ff21] border-0 hover:bg-[#1a90ff80]"
                  ><i class="fa-solid fa-volume-high"></i
                ></button>
              </div>
            </div>
    `;
    cardContainer.append(card);
  });
};
