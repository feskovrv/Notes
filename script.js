const initialNotes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];

// const initialNotes = [
//     {
//         title: "Пример заметки 1",
//         text: "Небесная сфера, по определению, ищет керн. Возмущающий фактор неравномерен. Азимут гасит Каллисто, выслеживая яркие, броские образования. Противостояние, на первый взгляд, колеблет дип-скай объект. Гелиоцентрическое расстояние представляет собой апогей. Ось оценивает непреложный радиант. У планет-гигантов нет твёрдой поверхности, таким образом декретное время перечеркивает маятник Фуко. Зенитное часовое число прекрасно гасит эксцентриситет, об этом в минувшую субботу сообщил заместитель администратора NASA. В связи с этим нужно подчеркнуть, что Каллисто сложен. Земная группа формировалась ближе к Солнцу, однако юлианская дата отражает перигелий. Тукан, следуя пионерской работе Эдвина Хаббла, сложен. Магнитное поле, после осторожного анализа, перечеркивает центральный зенит, при этом плотность Вселенной в 3 * 10 в 18-й степени раз меньше, с учетом некоторой неизвестной добавки скрытой массы."
//     },
//     {
//         title: "Пример заметки 2",
//         text: "Небесная сфера, по определению, ищет керн. Возмущающий фактор неравномерен. Азимут гасит Каллисто, выслеживая яркие, броские образования. Противостояние, на первый взгляд, колеблет дип-скай объект. Гелиоцентрическое расстояние представляет собой апогей. Ось оценивает непреложный радиант. У планет-гигантов нет твёрдой поверхности, таким образом декретное время перечеркивает маятник Фуко. Зенитное часовое число прекрасно гасит эксцентриситет, об этом в минувшую субботу сообщил заместитель администратора NASA. В связи с этим нужно подчеркнуть, что Каллисто сложен. Земная группа формировалась ближе к Солнцу, однако юлианская дата отражает перигелий. Тукан, следуя пионерской работе Эдвина Хаббла, сложен. Магнитное поле, после осторожного анализа, перечеркивает центральный зенит, при этом плотность Вселенной в 3 * 10 в 18-й степени раз меньше, с учетом некоторой неизвестной добавки скрытой массы."
//     },
//     {
//         title: "Пример заметки 3",
//         text: "Небесная сфера, по определению, ищет керн. Возмущающий фактор неравномерен. Азимут гасит Каллисто, выслеживая яркие, броские образования. Противостояние, на первый взгляд, колеблет дип-скай объект. Гелиоцентрическое расстояние представляет собой апогей. Ось оценивает непреложный радиант. У планет-гигантов нет твёрдой поверхности, таким образом декретное время перечеркивает маятник Фуко. Зенитное часовое число прекрасно гасит эксцентриситет, об этом в минувшую субботу сообщил заместитель администратора NASA. В связи с этим нужно подчеркнуть, что Каллисто сложен. Земная группа формировалась ближе к Солнцу, однако юлианская дата отражает перигелий. Тукан, следуя пионерской работе Эдвина Хаббла, сложен. Магнитное поле, после осторожного анализа, перечеркивает центральный зенит, при этом плотность Вселенной в 3 * 10 в 18-й степени раз меньше, с учетом некоторой неизвестной добавки скрытой массы."
//     }

// ]
const buttonAdd = document.querySelector('.add');
const editor = document.querySelector('.editor');
const buttonSave = document.querySelector('.editor__save');

function render(notes){
    const noteList = document.querySelector('.note-list');
    noteList.innerHTML = null;
    for(let idx = 0; idx < notes.length; idx++){
        const listItem = renderNote(notes[idx].title, notes[idx].text);
        listItem.onclick = () => {
            openCloseEditor(notes[idx]);
            buttonSave.onclick = () => saveNote(notes, idx);
        };
        noteList.append(listItem);
    }
}

function renderNote(newTitle, newText){
    const listItem = document.createElement('li');
    listItem.classList.add('note');
    const title = document.createElement('h2');
    title.classList.add('.note__title');
    title.innerText = newTitle;
    const text = document.createElement('p');
    text.classList.add('note__preview');
    text.innerText = newText;
    listItem.append(title);
    listItem.append(text);
    return listItem;
}
function openCloseEditor(note = {title: 'Заголовок', text: 'Текст заметки'}){
    const editorTitle = document.querySelector('.editor__title');
    const editorContent = document.querySelector('.editor__content');
    editorTitle.innerText = note.title;
    editorContent.innerText = note.text;
    editor.classList.toggle('editor__show');
    buttonAdd.classList.toggle('add_close');
}

function saveNote(notes = [], idx = -1) {
    const editorTitle = document.querySelector('.editor__title');
    const editorContent = document.querySelector('.editor__content');
    if (idx >= 0){
        notes[idx].title = editorTitle.textContent;
        notes[idx].text = editorContent.textContent;
    }else{
        notes.push({
            title: editorTitle.textContent, 
            text: editorContent.textContent
        });
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    render(notes);
    openCloseEditor();
}


buttonAdd.onclick = () => {
    openCloseEditor();
    buttonSave.onclick = () => saveNote(initialNotes);
}
render(initialNotes);


