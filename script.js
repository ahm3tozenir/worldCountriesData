// html elemanları seçildi
const wrapper = document.querySelector('.wrapper');
const popBtn = document.querySelector('.pop');
const langBtn = document.querySelector('.lang');

// buttonlara eventlistener atandı
popBtn.addEventListener('click', displayPopulation);
langBtn.addEventListener('click', displayLanguages);

// populasyana basıldığında çalışacak fonksiyon
function displayPopulation(){
    wrapper.innerHTML='';
    // poplasyonların tutuldu array
    let popArr = [];
    //  popArr deki tüm sayıların toplandığı array
    let sumArr = [];
    // for döngüsü ile anadizindeki eleman sayısı kadar ülke ismi ve popülasyon sayısını push ediyoruz
    for(let i=0; i<countries_data.length; i++){
        let eleman = {
            name : countries_data[i].name, 
            population: countries_data[i].population
        }
        popArr.push(eleman);
        // sumArr oluşturma mantığı .reduce() kullanırken objeden ziyade sadece array içermesiyle kolaylık sağlaması
        sumArr.push(countries_data[i].population)
    }
    
    // .sort() ile popülasyonlar büyükten küçüğe sıralanıyor
    let sirali = popArr.sort((a,b)=>b.population - a.population )
    
    // toplam nüfüsa oranlamak için total değişkeni atadık
    let total;
    for(let i=0; i<sumArr.length; i++){
        // .reduce() ile sumArr deki tüm nüfusları topladık getSum fonksiyonunu çalıştırarak
        let sum = sumArr.reduce(getSum, 0);
        total = sum;
    }
    function getSum(total, num){
        return total + num;
    }
    // ilk 10 ülkenin nüfusları büyükten küçüğe alt alta yazdırıyor
    for(let i=0; i<10; i++){
        let percentage = Math.round(sirali[i].population/total*100); // yüzdesel olarak yazmak için o ülkenin nüfusu toplam nufüsa bölünüp 100 ile çarpılıyor
        let p = document.createElement('p');
        p.style.width='300px';
        p.style.color='purple';
        p.textContent =`${sirali[i].name}`;
        wrapper.append(p);
        let div = document.createElement('div');
        div.style.width='100%';
        div.style.marginLeft='100px';
        div.classList.add('progress');
        div.role='progressbar';
        let divProg = document.createElement('div');
        divProg.classList.add('progress-bar');
        divProg.style.width=`${percentage}%`;
        divProg.style.backgroundColor='blue';
        divProg.textContent=`${percentage}%`;
        div.append(divProg);
        let item = document.createElement('div');
        item.style.display='flex';
        item.style.marginTop='10px';
        item.style.padding='10px 20px';
        item.style.borderRadius='5px';
        item.style.backgroundColor='bisque';
        item.append(p);
        item.append(div);
        wrapper.append(item);
            
    }
}

// languages butonuna basıldğında çalışacak fonksiyon
function displayLanguages(){
    wrapper.innerHTML='';
    // toplam konuşulan dillerin pushladığı boş array oluşturuldu
    let totalLangs = [];
    for(let i=0; i<countries_data.length; i++){
        // ülkelerin 1 den fazla konuşulan dili olduğu için her ülkenin içlerindek dili tek tek pushlanıyor
        for(let j=0; j<countries_data[i].languages.length; j++){
            totalLangs.push(countries_data[i].languages[j])
        }
    }

    // boş bir obje oluşturduk
    let langs = {};

    for (let i = 0; i < totalLangs.length; i++) {
    // toplam konuşulan diller eğer 1 den fazla ise if döngüsüne girip ++ ile 1 artıyor
    let langNum = totalLangs[i];
        if (langs[langNum]) {
            langs[langNum]++;
        } 
        else {
            langs[langNum] = 1;
        }
    }

    // konuşulan diller en çoktan en aza doğru sıralanıyor
    // object.keys kullanma nedeni langs objesine langNum ile dil ve konuşulma sayısı yer alıyor .keys kullanarak sadece konuşulma sayısına ulaşılıyor
    let sortedLangs = Object.keys(langs).sort((a, b) => langs[b] - langs[a]);  
      
    // en çok konuşulan 10 dili yazdıran döngü
    for (let i = 0; i < 10; i++) {
        let lang = sortedLangs[i];
        let langCount = langs[lang];
      
        let p = document.createElement('p');
        p.style.width='300px';
        p.style.color='purple';
        p.textContent =`${lang}`;
        wrapper.append(p);
        let div = document.createElement('div');
        div.style.width='100%';
        div.style.marginLeft='100px';
        div.style.backgroundColor='bisque';
        div.classList.add('progress');
        div.role='progressbar';
        let divProg = document.createElement('div');
        divProg.classList.add('progress-bar');
        divProg.style.width=`${langCount}%`;
        divProg.style.backgroundColor='blue';
        divProg.textContent=`${langCount}`;
        div.append(divProg);
        let item = document.createElement('div');
        item.style.display='flex';
        item.style.marginTop='10px';
        item.style.padding='10px 20px';
        item.style.borderRadius='5px';
        item.style.backgroundColor='bisque';
        item.append(p);
        item.append(div);
        wrapper.append(item);
    }
}


    



        

      


