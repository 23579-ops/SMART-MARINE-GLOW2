let score = 0;
let currentQuestionIndex = 0;
let visitedLocations = [];
let hasSupportedProject = false; 
let audioCtx = null;
let waveNoiseNode = null;
let isMusicPlaying = false;

// ระบบควบคุมหัวข้อการเรียนรู้
let currentChapter = 0;
let chapterClaimedStatus = [false, false, false, false, false];

const chaptersData = [
    {
        title: "บทที่ 1: วิกฤตการณ์เต่ามะเฟืองแห่งทะเลอันดามัน 🐢",
        content: `<b>เต่ามะเฟือง (Leatherback Turtle)</b> เป็นเต่าทะเลที่มีขนาดใหญ่ที่สุดในโลกและจัดเป็นสัตว์ป่าสงวนของไทย พวกมันไม่มีกระดองแข็งเหมือนเต่าทั่วไปแต่มีผิวหนังหนาสีดำคล้ายเบาะหนัง มีร่องตามยาว 7 ร่อง แหล่งวางไข่สำคัญคือหาดท้ายเหมือง ชายหาดพังงา และภูเก็ต<br><br>
        <b>ทำไมถึงวิกฤต?</b> อาหารหลักของเต่ามะเฟืองคือ 'แมงกะพรุน' ซึ่งเมื่อขยะประเภทถุงพลาสติกใสลอยอยู่ในน้ำทะเล มันจะพริ้วไหวดูคล้ายแมงกะพรุนอย่างมาก ทำให้เต่ามะเฟืองกลืนกินเข้าไปจนอุดตันในระบบย่อยอาหาร ส่งผลให้ระบบภายในล้มเหลวและเสียชีวิตในที่สุด นอกจากนี้แสงไฟส่องสว่างจากรีสอร์ตริมชายหาดยังรบกวนการขึ้นมาวางไข่ของแม่เต่าอีกด้วย`
    },
    {
        title: "บทที่ 2: ลมหายใจสุดท้ายของพะยูนฝูงใหญ่ที่เกาะลิบง 🧜‍♀️",
        content: `<b>พะยูน (Dugong)</b> สัตว์เลี้ยงลูกด้วยนมทางทะเลที่เป็นสัญลักษณ์แห่งเมืองตรัง โดยมีเกาะลิบงและอ่าวหยงหลำเป็นแหล่งอาศัยที่หนาแน่นที่สุดในอดีต เนื่องจากบริเวณนั้นเป็นทุ่งหญ้าทะเลขนาดใหญ่ซึ่งเป็นอาหารเพียงอย่างเดียวของพะยูน<br><br>
        <b>ทำไมถึงวิกฤต?</b> ปัจจุบันเกิดปรากฏการณ์หญ้าทะเลเสื่อมโทรมและแห้งตายเป็นจำนวนมากจากตะกอนและการเปลี่ยนแปลงภูมิอากาศ พะยูนจึงขาดแคลนอาหารอย่างรุนแรงจนต้องว่ายออกหากินนอกเขตอ่าว ปัญหาขยะเศษอวนเก่าที่ลอยมาพัน รวมถึงขยะไมโครพลาสติกขนาดเล็กที่ลอยปะปนในน้ำทำให้น้องพะยูนกลืนเข้าไปสะสมจนล้มป่วยลงเรื่อยๆ`
    },
    {
        title: "บทที่ 3: ยักษ์ใหญ่ใจดี ฉลามวาฬ และภัยเงียบ 'อวนผี' 🐋",
        content: `<b>ฉลามวาฬ (Whale Shark)</b> พี่ใหญ่ใจดีแห่งกองหินริเชลิว จังหวัดพังงา และเกาะร้านเป็ดร้านไก่ เป็นปลากระดูกอ่อนขนาดใหญ่ที่สุด มีหน้าที่กรองกินแพลงก์ตอนและสัตว์น้ำขนาดเล็ก เป็นเครื่องบ่งชี้ความสมบูรณ์ของกระแสน้ำและระบบนิเวศแนวปะการังน้ำลึก<br><br>
        <b>ทำไมถึงวิกฤต?</b> ภัยคุกคามอันดับหนึ่งของฉลามวาฬคือ 'Ghost Nets' หรือ อวนผี ซึ่งก็คือเศษอวนขนาดใหญ่ที่เรือประมงตัดทิ้งหรือทำหลุดลอยอยู่ในมหาสมุทร เมื่อฉลามวาฬว่ายผ่าน เศษอวนเหล่านี้จะเกี่ยวรัดเข้าที่ครีบหรือหาง บาดลึกลงไปในเนื้อจนเกิดบาดแผลฉกรรจ์ติดเชื้อ และลดความสามารถในการว่ายน้ำลง`
    },
    {
        title: "บทที่ 4: โลมาสีชมพูแห่งขนอม และภัยจากมลพิษชายฝั่ง 🐬",
        content: `<b>โลมาสีชมพู (Indo-Pacific Humpback Dolphin)</b> ถือเป็นไฮไลท์สำคัญของการท่องเที่ยวเชิงอนุรักษ์บริเวณอ่าวขนอม จังหวัดนครศรีธรรมราช และหมู่เกาะดอนสัก สุราษฎร์ธานี ตอนเด็กจะมีสีเทา แต่พอโตขึ้นเส้นเลือดฝอยใต้ผิวหนังจะทำให้เห็นเป็นสีชมพูสวยงาม<br><br>
        <b>ทำไมถึงวิกฤต?</b> พวกมันอาศัยอยู่ใกล้ชายฝั่งมาก ทำให้ได้รับผลกระทบโดยตรงจากขยะพลาสติกชิ้นใหญ่ เช่น ถุงปุ๋ย เชือกเรือ และมลพิษสารเคมีที่ปล่อยมาจากแม่น้ำและชุมชนริมชายฝั่ง นอกจากนี้ เสียงเครื่องยนต์เรือสปีดโบ๊ทของนักท่องเที่ยวที่เข้าไปใกล้เกินไป ยังทำลายระบบโซนาร์นำทางและหาอาหารของโลมาอีกด้วย`
    },
    {
        title: "บทที่ 5: แนวปะการังฟอกขาว และสารเคมีในครีมกันแดด 🪸",
        content: `<b>แนวปะการัง (Coral Reefs)</b> ที่เกาะเต่า สิมิลัน และหมู่เกาะสุรินทร์ คือบ้านของสิ่งมีชีวิตในทะเลกว่า 25% ปัจจุบันกำลังเผชิญหน้ากับภาวะ 'ปะการังฟอกขาว' จากการที่อุณหภูมิน้ำทะเลสูงขึ้นเนื่องจากภาวะโลกร้อน ทำให้สาหร่ายซูแชนเทลลีหลุดออกไป เหลือแต่โครงสร้างหินปูนสีขาวซีด<br><br>
        <b>ทำไมถึงวิกฤต?</b> ครีมกันแดดทั่วไปของนักท่องเที่ยวที่มีสารเคมีอย่าง <b>Oxybenzone</b> และ <b>Octinoxate</b> เป็นตัวเร่งทำให้ปะการังเกิดการฟอกขาวง่ายขึ้นแม้อุณหภูมิน้ำจะปกติ และยังไปทำลายตัวอ่อนปะการัง ขัดขวางการเจริญเติบโต การเลือกใช้ครีมกันแดดสูตร Reef-Safe จึงเป็นสิ่งสำคัญระดับสากล`
    }
];

// คลังพิกัดภูมิศาสตร์จริงของสถานที่ท่องเที่ยวภาคใต้ (Latitude, Longitude)
const locationCoordinates = {
    'อุทยานแห่งชาติหมู่เกาะสิมิลัน 🏝️': { lat: 8.6474, lon: 97.6433 },
    'แหลมพรหมเทพ 🌅': { lat: 7.7603, lon: 98.3056 },
    'อ่าวพังงา (เกาะตาปู) ⛰️': { lat: 8.2741, lon: 98.5005 },
    'อ่าวมาหยา เกาะพีพี 🌊': { lat: 7.6811, lon: 98.7661 },
    'สระมรกต 🌲': { lat: 7.9231, lon: 99.2612 },
    'ทะเลแหวก 🏝️': { lat: 7.9739, lon: 98.8105 },
    'เขื่อนเชี่ยวหลาน (เขาสก) ⛰️': { lat: 8.9774, lon: 98.8203 },
    'เกาะเต่า (แหล่งดำน้ำ) 🪸': { lat: 10.0956, lon: 99.8403 },
    'เกาะสมุย (หินตาหินยาย) 🏝️': { lat: 9.4519, lon: 100.0383 },
    'เกาะหลีเป๊ะ อุทยานฯ ตะรุเตา 🪸': { lat: 6.4894, lon: 99.3023 },
    'ถ้ำมรกต เกาะมุก 🌊': { lat: 7.3719, lon: 99.2964 },
    'เกาะกระดาน (หาดสวยที่สุด) 🏖️': { lat: 7.3072, lon: 99.2553 }
};

// คลังรายชื่อการ์ดรางวัล (แก้ไขรูปปลานกแก้วให้เรียบร้อยแล้ว)
const gachaPrizes = [
    { id: 0, name: "⭐ [Normal] การ์ดปลานกแก้วสุดกวน 🦜🐠", img: "https://images.unsplash.com/photo-1524704654690-b56c05c78a02?w=200", unlocked: false },
    { id: 1, name: "⭐ [Normal] การ์ดปูเสฉวนฝาขวด 🐚🦀", img: "https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?w=200", unlocked: false },
    { id: 2, name: "✨ [Rare] การ์ดม้าน้ำคู่รักอันดามัน 🧜‍♂️🐴", img: "https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=200", unlocked: false },
    { id: 3, name: "✨ [Rare] การ์ดปลาการ์ตูนส้มขาว 🐠🪸", img: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=200", unlocked: false },
    { id: 4, name: "🔥 [Epic] การ์ดโลมาสีชมพูขนอม 🐬💖", img: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=200", unlocked: false },
    { id: 5, name: "🔥 [Epic] การ์ดพะยูนอ้วนเกาะลิบง 🧜‍♀️🌾", img: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=200", unlocked: false },
    { id: 6, name: "👑 [ตำนาน SSR!!] ฉลามวาฬริเชลิว 🐋✨", img: "https://images.unsplash.com/photo-1560275669-46c5a88d6a4c?w=200", unlocked: false },
    { id: 7, name: "👑 [ตำนาน SSR!!] แม่เต่ามะเฟืองพิทักษ์หาด 🐢🔱", img: "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=200", unlocked: false }
];

const quizData = [
    {
        question: "ภารกิจที่ 1: ขณะเดินเล่นบนชายหาดป่าตอง คุณพบขวดพลาสติกเปล่าลอยมาติดหาด คุณควรทำอย่างไร?",
        options: [{ text: "เก็บขวดพลาสติกไปทิ้งลงถังแยกขยะบริเวณอุทยาน", correct: true }, { text: "ปล่อยทิ้งไว้ตรงนั้นเพราะไม่ใช่ขยะของเรา", correct: false }]
    },
    {
        question: "ภารกิจที่ 2: ในการไปเที่ยวเกาะพีพี เพื่อลดการสร้างขยะพลาสติกรูปแบบใช้ครั้งเดียวทิ้ง (Single-use plastic) คุณควรเตรียมสิ่งใดไป?",
        options: [{ text: "นำกระเป๋าผ้าและกระบอกน้ำพกพาไปใช้เอง", correct: true }, { text: "ไปซื้อถุงพลาสติกและขวดน้ำใหม่ทุกครั้งที่ร้านค้าบนเกาะ", correct: false }]
    },
    {
        question: "ภารกิจที่ 3: หากคุณต้องการดื่มน้ำอัดลมระหว่างนั่งเรือสปีดโบ๊ทไปเกาะสิมิลัน พฤติกรรมใดปลอดภัยต่อทะเลที่สุด?",
        options: [{ text: "ใช้หลอดกระดาษหรือยกดื่มจากกระป๋องโดยตรง", correct: true }, { text: "ใช้หลอดพลาสติกทั่วไปเพราะสะดวกดี", correct: false }]
    },
    {
        question: "ภารกิจที่ 4: การทิ้งเศษอวนหรือเชือกประมงเก่าลงในทะเลอันดามัน ส่งผลเสียอย่างไรเด่นชัดที่สุด?",
        options: [{ text: "กลายเป็น 'อวนผี' ที่คอยดักรัดและบาดลึกบนตัวสัตว์ทะเลหายาก", correct: true }, { text: "ช่วยเป็นที่หลบภัยชั่วคราวให้ปลาขนาดเล็ก", correct: false }]
    },
    {
        question: "ภารกิจ 5: เมื่อคุณรับประทานอาหารเสร็จบนเรือนำเที่ยว ควรจัดการกับเศษอาหารและบรรจุภัณฑ์อย่างไร?",
        options: [{ text: "รวบรวมใส่ถุงดำบนเรือเพื่อนำกลับไปทิ้งบนฝั่ง", correct: true }, { text: "โยนเศษอาหารลงทะเลให้ปลากิน ส่วนถุงโยนตามไปช่างมัน", correct: false }]
    },
    {
        question: "ภารกิจที่ 6: พฤดิกรรมการทิ้งถุงพลาสติกใสลงสู่แม่น้ำสายหลักก่อนไหลลงทะเลใต้ ส่งผลกระทบโดยตรงต่อสัตว์ชนิดใดเนื่องจากเข้าใจผิดว่าเป็นอาหาร?",
        options: [{ text: "เต่ามะเฟือง เพราะถุงพลาสติกใสลอยน้ำดูคล้ายแมงกะพรุน", correct: true }, { text: "พะยูน เพราะถุงพลาสติกดูคล้ายสาหร่ายทะเล", correct: false }]
    },
    {
        question: "ภารกิจที่ 7: ข้อใดเป็นวิธีการจัดการขยะประเภทเศษอาหารบนเกาะท่องเที่ยวที่ถูกต้องเพื่อไม่ให้ปนเปื้อนลงแหล่งน้ำ?",
        options: [{ text: "แยกขยะอินทรีย์เพื่อทำปุ๋ยหมักในพื้นที่ที่จัดเตรียมไว้", correct: true }, { text: "ฝังกลบเศษอาหารไว้ใต้ผืนทรายชายหาดให้เน่าเปื่อยเอง", correct: false }]
    },
    {
        question: "ภารกิจที่ 8: พฤดิกรรมการเทน้ำมันพืชที่ใช้แล้วจากการทำอาหารลงในท่อระบายน้ำใกล้ชายหาด ส่งผลอย่างไร?",
        options: [{ text: "คราบไขมันจะอุดตันและเคลือบผิวหน้าอ่าว ทำให้ออกซิเจนในน้ำลดลง", correct: true }, { text: "น้ำมันพืชสามารถย่อยสลายได้เองในน้ำทะเลอย่างรวดเร็ว", correct: false }]
    },
    {
        question: "ภารกิจที่ 9: พฤติกรรมใดเป็นการท่องเที่ยวชายหาดที่ยั่งยืนและรับผิดชอบต่อสิ่งแวดล้อม?",
        options: [{ text: "เดินถ่ายรูปและไม่เก็บสิ่งใดติดมือกลับมานอกจากขยะและภาพถ่าย", correct: true }, { text: "เก็บเปลือกหอยสวย ๆ หรือก้อนหินแปลกตาใส่กระเป๋ากลับบ้าน", correct: false }]
    },
    {
        question: "ภารกิจที่ 10: หากคุณพบเห็นนักท่องเที่ยวคนอื่นกำลังทิ้งขยะลงบนแนวโขดหินริมทะเล คุณควรปฏิบัติอย่างไรจึงจะเหมาะสมที่สุด?",
        options: [{ text: "แจ้งเจ้าหน้าที่ดูแลพื้นที่หรือช่วยเก็บไปทิ้งในจุดที่ถูกต้อง", correct: true }, { text: "เข้าไปต่อว่าด้วยอารมณ์รุนแรงทันที", correct: false }],
    },
    {
        question: "ภารกิจที่ 11: ก่อนลงดำน้ำตื้น (Snorkeling) ที่เกาะเต่า คุณควรเลือกใช้ครีมกันแดดที่มีคุณสมบัติอย่างไร?",
        options: [{ text: "เป็นมิตรต่อปะการัง (Reef-Safe) ปราศจากสาร Oxybenzone", correct: true }, { text: "เน้นสูตรกันน้ำเข้มข้นที่มีสารกันเสียและเคมีสะท้อนแสงทุกชนิด", correct: false }]
    },
    {
        question: "ภารกิจที่ 12: ระหว่างดำน้ำลึก (Scuba Diving) แล้วกระแสน้ำเริ่มแรง พฤติกรรมใดปลอดภัยต่อแนวปะการังที่สุด?",
        options: [{ text: "ควบคุมการลอยตัว (Buoyancy) และกางแขนขาหลบเลี่ยงการชน", correct: true }, { text: "ใช้มือจับหรือใช้เท้าเหยียบบนก้อนปะการังเพื่อยึดตัวให้มั่นคง", correct: false }]
    },
    {
        question: "ภารกิจที่ 13: หากคุณโชคดีพบ 'ฉลามวาฬ' ขณะดำน้ำที่กองหินริเชลิว ข้อใดปฏิบัติตามหลักสากลได้ถูกต้อง?",
        options: [{ text: "รักษาระระยะห่างอย่างน้อย 3-4 เมตร และห้ามสัมผัสตัวหรือใช้แฟลชถ่ายรูป", correct: true }, { text: "ว่ายเข้าไปเกาะครีบหลังเพื่อประหยัดแรงและถ่ายรูปคู่ใกล้ ๆ", correct: false }]
    },
    {
        question: "ภารกิจที่ 14: การจัดกิจกรรม 'ปล่อยลูกเต่าทะเลคืนสู่ธรรมชาติ' ควรจัดช่วงเวลาใดและลักษณะใดจึงจะส่งผลดีต่ออัตราการรอดชีวิตของลูกเต่ามากที่สุด?",
        options: [{ text: "ปล่อยช่วงค่ำหรือเช้ามืดในจุดที่สงบเงียบ เพื่อลดการตื่นตกใจและเลี่ยงสัตว์นักล่า", correct: true }, { text: "ปล่อยช่วงเที่ยงวันแดดจัดที่มีนักท่องเที่ยวรายล้อมเปิดไฟสปอตไลท์เยอะๆ", correct: false }]
    },
    {
        question: "ภารกิจที่ 15: ในการนำเรือท่องเที่ยวเข้าจอดบริเวณอ่าวมาหยา ข้อใดเป็นวิธีการจอดเรือที่อนุรักษ์ระบบนิเวศใต้ทะเล?",
        options: [{ text: "ผูกเรือเข้ากับทุ่นจอดเรือ (Mooring Buoy) ที่อุทยานจัดไว้ให้", correct: true }, { text: "ทิ้งสมอเหล็กลงไปตรงจุดที่มีแนวปะการังหนาแน่นเพื่อยึดเรือได้แน่นหนา", correct: false }]
    },
    {
        question: "ภารกิจที่ 16: การซื้อของที่ระลึกประเภทพวงกุญแจซากปะการังจริง หรือเปลือกหอยมือเสือตากแห้ง ส่งผลกระทบอย่างไร?",
        options: [{ text: "เป็นการสนับสนุนขบวนการลักลอบทำลายและล่าของป่าคุ้มครองทางทะเล", correct: true }, { text: "ช่วยกระจายรายได้และส่งเสริมการประมงพื้นบ้านอย่างยั่งยืน", correct: false }]
    },
    {
        question: "ภารกิจที่ 17: ข้อใดคือบทบาทหน้าที่ที่ถูกต้องเมื่อคุณพบเห็นสัตว์ทะเลหายาก เช่น พะยูน หรือ เต่าทะเล ได้รับบาดเจ็บเกยตื้นบริเวณเกาะลิบง?",
        options: [{ text: "รีบแจ้งสายด่วนกรมทรัพยากรทางทะเลและชายฝั่ง และคอยกันคนไม่ให้รบกวนสัตว์", correct: true }, { text: "พยายามลากสัตว์กลับลงน้ำลึกด้วยตัวเองทันทีโดยไม่ประเมินบาดแผล", correct: false }]
    },
    {
        question: "ภารกิจที่ 18: พฤดิกรรม 'ให้อาหารปลาการ์ตูนหรือปลาสลิดหิน' ในแนวปะการัง ส่งผลเสียต่อระบบนิเวศอย่างไร?",
        options: [{ text: "ทำให้พฤติกรรมสัตว์เปลี่ยน เลิกกินตะไคร่น้ำ ส่งผลให้ตะไคร่น้ำโตคลุมปะการังจนตาย", correct: true }, { text: "ช่วยให้ปลาเจริญเติบโตได้รวดเร็วและเพิ่มจำนวนประชากรปลาสวยงาม", correct: false }]
    },
    {
        question: "ภารกิจที่ 19: การสัมผัสหรือจับ 'ปลาดาว (ดาวทะเล)' ขึ้นมาเหนือน้ำเพื่อถ่ายรูปส่งผลกระทบอย่างไรต่อตัวดาวทะเล?",
        options: [{ text: "ระบบท่อน้ำในร่างกายจะเสียหายจากอากาศ และสารเคมีจากมือมนุษย์อาจทำให้ติดเชื้อตาย", correct: true }, { text: "ดาวทะเลสามารถทนทานต่อการขาดน้ำได้เป็นวัน ๆ ไม่มีผลกระทบใดๆ", correct: false }]
    },
    {
        question: "ภารกิจที่ 20: หากร้านอาหารซีฟู้ดนำ 'ปลานกแก้ว' มาวางจำหน่าย ในฐานะผู้บริโภคที่อนุรักษ์ทะเลควรทำอย่างไร?",
        options: [{ text: "ปฏิเสธการซื้อและช่วยรณรงค์ให้งดบริโภค เนื่องจากปลานกแก้วมีหน้าที่สำคัญในการกินตะไคร่บนปะการัง", correct: true }, { text: "สนับสนุนซื้อไปรับประทานเพราะเป็นปลาหายากรสชาติดี", correct: false }],
    },
    {
        question: "ภารกิจที่ 21: 'หญ้าทะเล (Seagrass)' บริเวณทะเลตรัง มีความสำคัญในแง่ของภาวะโลกร้อน (Global Warming) อย่างไร?",
        options: [{ text: "เป็นแหล่งกักเก็บคาร์บอนที่มีประสิทธิภาพสูงมาก (Blue Carbon) ดีกว่าป่าบกเมื่อเทียบพื้นที่เท่ากัน", correct: true }, { text: "ช่วยทำให้น้ำทะเลมีอุณหภูมิที่เย็นลงเนื่องจากสะท้อนแสงอาทิตย์ได้ดี", correct: false }]
    },
    {
        question: "ภารกิจที่ 22: ปรากฏการณ์ 'ปะการังฟอกขาว (Coral Bleaching)' เกิดจากสาเหตุข้อใดเป็นหลักในเชิงวิทยาศาสตร์?",
        options: [{ text: "อุณหภูมิน้ำทะเลสูงขึ้นต่อเนื่อง ทำให้สาหร่าย ซูแชนเทลลี (Zooxanthellae) ที่ให้พลังงานและสีสันหลุดออกไป", correct: true }, { text: "มีคราบน้ำมันมาเคลือบผิวหน้าปะการังทำให้ไม่สามารถสังเคราะห์แสงได้", correct: false }]
    },
    {
        question: "ภารกิจที่ 23: โครงการ 'Smart Marine Glow' ที่นำเศษอวนประมงและขยะพลาสติกจากทะเลใต้มาแปรรูป ช่วยลดก๊าซเรือนกระจกได้อย่างไร?",
        options: [{ text: "ลดการดึงเม็ดพลาสติกใหม่จากปิโตรเลียมมาใช้ และกักเก็บขยะไม่ให้แตกตัวเป็นไมโครพลาสติก", correct: true }, { text: "ช่วยเพิ่มปริมาณการผลิตออกซิเจนในชั้นบรรยากาศโดยตรง", correct: false }]
    },
    {
        question: "ภารกิจที่ 24: ไมโครพลาสติก (Microplastics) ที่ปนเปื้อนในทะเลภาคใต้ สามารถส่งผลกระทบย้อนกลับมาสู่มนุษย์ผ่านกระบวนการใด?",
        options: [{ text: "การสะสมทางชีวภาพ (Bioaccumulation) ผ่านห่วงโซ่อาหารเมื่อเรากินอาหารทะเล", correct: true }, { text: "การระเหยกลายเป็นไอพร้อมกับน้ำทะเลแล้วมนุษย์สูดดมเข้าไป", correct: false }]
    },
    {
        question: "ภารกิจที่ 25: ภาวะ 'ทะเลเป็นกรด (Ocean Acidification)' ที่เกิดจากการดูดซับก๊าซ CO₂ ของมหาสมุทร ส่งผลกระทบต่อสัตว์ทะเลกลุ่มใดรุนแรงที่สุด?",
        options: [{ text: "สัตว์ที่มีเปลือกหรือโครงสร้างเป็นสารประกอบแคลเซียมคาร์บอเนต เช่น หอย ปู และปะการัง", correct: true }, { text: "สัตว์เลี้ยงลูกด้วยนมในทะเล เช่น พะยูน และโลมาสีชมพู", correct: false }]
    },
    {
        question: "ภารกิจที่ 26: ป่าชายเลนตามชายฝั่งภาคใต้ทำหน้าที่เป็นระบบบำบัดน้ำเสียตามธรรมชาติให้กับทะเลได้อย่างไร?",
        options: [{ text: "รากของต้นโกงกางช่วยดักกรองสารตะกอน หน่วงความเร็วของน้ำ และดูดซับสารอินทรีย์ส่วนเกิน", correct: true }, { text: "ใบของต้นโกงกางคอยปล่อยสารเคมีที่ทำลายเชื้อแบคทีเรียทั้งหมดในน้ำ", correct: false }]
    },
    {
        question: "ภารกิจที่ 27: การท่องเที่ยวแบบ 'Carbon Neutral Tourism' ในเกาะสมุย หมายถึงการจัดกิจกรรมในลักษณะใด?",
        options: [{ text: "การคำนวณการปล่อยคาร์บอนจากกิจกรรมทั้งหมด แล้วซื้อคาร์บอนเครดิตมาชดเชยให้เป็นศูนย์", correct: true }, { text: "การห้ามใช้อุปกรณ์ไฟฟ้าและห้ามเดินทางด้วยยานพาหนะทุกชนิดบนเกาะ", correct: false }]
    },
    {
        question: "ภารกิจที่ 28: เหตุใดขยะประเภท 'ขวดแก้ว' แม้จะไม่แตกตัวเป็นไมโครพลาสติก แต่ก็จัดเป็นขยะที่ห้ามทิ้งลงทะเลเด็ดขาดในแง่ของแนวปะการัง?",
        options: [{ text: "ขวดแก้วมีน้ำหนักมาก หากจมทับปะการังจะหักพัง และเศษแก้วที่แตกจะบาดผิวหนังตัวอ่อนสัตว์ทะเล", correct: true }, { text: "ขวดแก้วจะทำปฏิกิริยาเคมีกับน้ำทะเลทำให้น้ำทะเลเปลี่ยนสี", correct: false }]
    },
    {
        question: "ภารกิจที่ 29: ข้อใดอธิบายคำว่า 'Eutrophication' ที่เกิดจากการปล่อยน้ำทิ้งชุมชนริมชายหาดลงทะเลได้ถูกต้องที่สุด?",
        options: [{ text: "ไนโตรเจนและฟอสฟอรัสล้นระบบ ทำให้แพลงก์ตอนบลูมบังแสงแดด ทำให้ออกซิเจนใต้น้ำหมดลง", correct: true }, { text: "การเพิ่มขึ้นของความความเค็มในน้ำทะเลเนื่องจากสารเคมีซักล้างทำปฏิกิริยากับเกลือ", correct: false }]
    },
    {
        question: "ภารกิจที่ 30: ภารกิจสูงสุด! หากต้องการฟื้นฟูระบบนิเวศ Blue Carbon ในอ่าวไทยและอันดามันอย่างยั่งยืนยาวนาน 100 ปี ข้อใดคือแนวทางเชิงรุกระดับนโยบายที่ทรงประสิทธิภาพที่สุด?",
        options: [{ text: "ประกาศเขตพื้นที่คุ้มครองทางทะเล ควบคุมการทำประมงทำลายล้าง ควบคู่กับการฟื้นฟูป่าชายเลนและแหล่งหญ้าทะเลร่วมกับชุมชน", correct: true }, { text: "ระดมเงินทุนซื้อเครื่องกรองน้ำทะเลขนาดใหญ่มาติดตั้งตามเกาะท่องเที่ยวทุกแห่ง", correct: false }]
    }
];

function initAudio() {
    if (!audioCtx) { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
}

function playSound(type) {
    initAudio();
    if (!audioCtx) return;
    let osc = audioCtx.createOscillator();
    let gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    
    if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start(); osc.stop(audioCtx.currentTime + 0.4);
    } else if (type === 'fail') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'click') {
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        osc.start(); osc.stop(audioCtx.currentTime + 0.05);
    }
}

function toggleMusic() {
    initAudio();
    const statusText = document.getElementById("music-status");
    if (!isMusicPlaying) {
        let bufferSize = 2 * audioCtx.sampleRate,
            noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
            output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) { output[i] = Math.random() * 2 - 1; }
        let whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer; whiteNoise.loop = true;
        let filter = audioCtx.createBiquadFilter(); filter.type = 'lowpass'; filter.Q.value = 1;
        let lfo = audioCtx.createOscillator(); lfo.frequency.value = 0.15;
        let lfoGain = audioCtx.createGain(); lfoGain.gain.value = 300;
        lfo.connect(lfoGain); lfoGain.connect(filter.frequency); whiteNoise.connect(filter);
        let gain = audioCtx.createGain(); gain.gain.value = 0.08;
        filter.connect(gain); gain.connect(audioCtx.destination);
        lfo.start(); whiteNoise.start(); waveNoiseNode = { whiteNoise, lfo };
        isMusicPlaying = true; statusText.innerText = "ปิดเสียงคลื่น";
    } else {
        if(waveNoiseNode) { waveNoiseNode.whiteNoise.stop(); waveNoiseNode.lfo.stop(); }
        isMusicPlaying = false; statusText.innerText = "เปิดเสียงคลื่น";
    }
}

// ควบคุมการเลือกและเปิดแสดงแท็บของบทเรียน 1-5
function switchChapter(index) {
    playSound('click');
    currentChapter = index;
    
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach((tab, i) => {
        if (i === index) tab.classList.add('active');
        else tab.classList.remove('active');
    });

    const data = chaptersData[index];
    document.getElementById("chapter-content").innerHTML = `
        <h3 style="color:#ffd166; margin-top:0;">${data.title}</h3>
        <p style="font-size:14px; line-height:1.6;">${data.content}</p>
    `;

    const claimBtn = document.getElementById("btn-claim-chapter");
    if (chapterClaimedStatus[index]) {
        claimBtn.innerText = "🔒 เคยรับพ้อยท์บทนี้แล้ว";
        claimBtn.style.background = "gray";
        claimBtn.style.cursor = "not-allowed";
        claimBtn.style.boxShadow = "none";
    } else {
        claimBtn.innerText = "อ่านจบแล้ว รับ Eco Point +40";
        claimBtn.style.background = "linear-gradient(90deg, #00b4d8, #06d6a0)";
        claimBtn.style.cursor = "pointer";
        claimBtn.style.boxShadow = "0 4px 15px rgba(0, 180, 216, 0.3)";
    }
}

function claimChapterPoints() {
    if (chapterClaimedStatus[currentChapter]) {
        playSound('fail');
        showAlert("คุณเคยรับแต้มของบทเรียนนี้ไปแล้วครับ ลองสลับไปบทอื่นนะ! 📚");
        return;
    }

    chapterClaimedStatus[currentChapter] = true;
    score += 40;
    updateScoreUI();
    playSound('success');
    
    showAlert(`📚 บันทึกการเรียนรู้สำเร็จ!<br>คุณได้รับ Eco Point +40 แต้มจาก <b>บทที่ ${currentChapter + 1}</b> เรียบร้อยแล้ว!`);
    switchChapter(currentChapter);
}

// ระบบคำนวณระยะพิกัดพื้นโลก (Haversine Formula) หน่วยกิโลเมตร
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; 
}

// ฟังก์ชันเช็คอินด้วยระบบ GPS จริง
function scanLocation(locName, points) {
    if (visitedLocations.includes(locName)) {
        playSound('fail');
        showAlert("คุณเคยเช็คอินที่นี่ไปแล้วครับ 🗺️");
        return;
    }

    if (!navigator.geolocation) {
        playSound('fail');
        showAlert("อุปกรณ์ของคุณไม่รองรับระบบระบุพิกัด GPS 📱");
        return;
    }

    showAlert("📡 กำลังตรวจสอบพิกัด GPS ของคุณสักครู่...");

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            const targetCoords = locationCoordinates[locName];
            
            if (!targetCoords) {
                playSound('fail');
                showAlert("ไม่พบข้อมูลพิกัดของสถานที่นี้ในระบบ");
                return;
            }

            const distance = getDistanceFromLatLonInKm(userLat, userLon, targetCoords.lat, targetCoords.lon);
            
            // 🎯 ตั้งรัศมีกว้างไว้ให้เผื่อทดสอบกดเล่นจากที่บ้านได้เลยผ่านฉลุย!
            // (ถ้าจะใช้งานจริงภาคสนาม ให้เปลี่ยนตัวเลขนี้กลับเป็น 2.0 ครับ)
            const maxDistanceAllowed = 10000.0; 

            if (distance <= maxDistanceAllowed) {
                visitedLocations.push(locName);
                score += points; 
                updateScoreUI(); 
                playSound('success');
                showAlert(`🎯 เช็คอินสำเร็จที่ ${locName}!<br>ระบบตรวจพบว่าคุณอยู่ใกล้จุดจริงในระยะทดสอบ รับเพิ่ม +${points} แต้ม! 🌱`);
            } else {
                playSound('fail');
                showAlert(`❌ เช็คอินล้มเหลว!<br>คุณอยู่ห่างจากจุดจริงเกินไป (ตอนนี้ห่างประมาณ ${distance.toFixed(0)} กม.) คุณต้องอยู่บนสถานที่จริงเท่านั้นจึงจะรับแต้มได้ครับ!`);
            }
        },
        (error) => {
            playSound('fail');
            showAlert("❌ ไม่สามารถเข้าถึงพิกัดของคุณได้ กรุณาเปิดแชร์สิทธิ์ตำแหน่ง (Location Services) บนเบราว์เซอร์ก่อนใช้งาน");
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
}

function renderCollection() {
    const grid = document.getElementById("collection-grid");
    if (!grid) return;
    grid.innerHTML = "";
    let unlockedCount = 0;

    gachaPrizes.forEach(card => {
        const item = document.createElement("div");
        item.className = "item-card";
        if (card.unlocked) {
            item.classList.add("unlocked");
            unlockedCount++;
        }

        item.innerHTML = `
            <img src="${card.img}" alt="card">
            <span class="card-name" style="color: ${card.unlocked ? '#fff' : '#aaa'}">
                ${card.unlocked ? card.name : "🔒 ยังไม่ครอบครอง"}
            </span>
        `;
        grid.appendChild(item);
    });

    document.getElementById("collection-count").innerText = unlockedCount;
    document.getElementById("card-count-home").innerText = unlockedCount;
}

function supportProject(btnElement) {
    if (hasSupportedProject) {
        playSound('fail');
        showAlert("คุณได้สนับสนุนโครงการนี้ไปเรียบร้อยแล้วครับ! 🌟");
        return;
    }
    hasSupportedProject = true;
    score += 20;
    updateScoreUI();
    playSound('success');
    
    btnElement.innerText = "🔒 สนับสนุนโครงการแล้ว (+20 แต้ม)";
    btnElement.style.background = "gray";
    btnElement.style.cursor = "not-allowed";
    
    showAlert("✨ ขอบคุณที่ร่วมสนับสนุนโครงการ Smart Marine Glow!<br>ได้รับ Eco Point +20 แต้มเรียบร้อยครับ!");
}

function updateScoreUI() {
    const scoreElement = document.getElementById("score");
    const scoreBadge = document.getElementById("scoreBadge");
    if(scoreElement) scoreElement.innerHTML = score;
    if(scoreBadge) {
        scoreBadge.classList.add("pulse");
        setTimeout(() => scoreBadge.classList.remove("pulse"), 500);
    }
    updateRank();
}

function updateRank() {
    const rankElement = document.getElementById("user-rank");
    if(!rankElement) return;
    if (score >= 300) {
        rankElement.innerText = "🔱 เจ้าสมุทรผู้พิทักษ์อันดามัน";
        rankElement.style.color = "#06d6a0";
    } else if (score >= 150) {
        rankElement.innerText = "🤿 นักดำน้ำพิทักษ์ปะการัง";
        rankElement.style.color = "#00b4d8";
    } else if (score >= 50) {
        rankElement.innerText = "🌿 อาสาสมัครบีชคลีนเนอร์";
        rankElement.style.color = "#9bf6ff";
    } else {
        rankElement.innerText = "นักท่องเที่ยวฝึกหัด";
        rankElement.style.color = "#ffd166";
    }
}

function page(id) {
    playSound('click');
    document.querySelectorAll(".card").forEach(x => x.classList.add("hide"));
    document.getElementById(id).classList.remove("hide");
    
    if (id === 'animal') { switchChapter(0); }
    if (id === 'collection-page') { renderCollection(); }
}

function back() {
    playSound('click');
    document.querySelectorAll(".card").forEach(x => x.classList.add("hide"));
    document.getElementById("home").classList.remove("hide");
    renderCollection();
}

function showAlert(msg) {
    document.getElementById("alertMessage").innerHTML = msg;
    document.getElementById("customAlert").classList.remove("hide");
}

function closeAlert() {
    playSound('click');
    document.getElementById("customAlert").classList.add("hide");
}

function startQuiz() {
    currentQuestionIndex = 0;
    page('quiz');
    showQuestion();
}

function showQuestion() {
    const currentQuiz = quizData[currentQuestionIndex];
    document.getElementById("quiz-number").innerText = currentQuestionIndex + 1;
    document.getElementById("quiz-question").innerText = currentQuiz.question;
    const optionsContainer = document.getElementById("quiz-options");
    optionsContainer.innerHTML = "";
    
    const shuffledOptions = [...currentQuiz.options].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.onclick = (e) => {
            if (!option.correct) { e.target.classList.add("btn-danger"); }
            setTimeout(() => { handleAnswer(option.correct); }, 300);
        };
        optionsContainer.appendChild(button);
    });
}

function handleAnswer(isCorrect) {
    if (isCorrect) {
        score += 3; 
        updateScoreUI();
        playSound('success');
        showAlert("ถูกต้อง! 🎉 (+3 แต้ม)");
    } else {
        playSound('fail');
        showAlert("ผิดจ้า ลองวิเคราะห์สถานการณ์ใหม่อีกครั้งนะ ❌");
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showAlert("🏆 ยินดีด้วย! คุณผ่านควิซผู้พิทักษ์ทะเล 30 ข้อครบถ้วนแล้ว!");
        back();
    }
}

function rollGacha() {
    if (score < 50) {
        playSound('fail'); showAlert("แต้มไม่พอ! ต้องใช้ 50 แต้ม ไปทำควิซหรืออ่านบทเรียนอัพแต้มก่อนนะ"); return;
    }
    score -= 50; updateScoreUI();
    const display = document.getElementById("gacha-display");
    display.innerHTML = "🌀<br>กำลังสุ่มการ์ด...";
    playSound('click');
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * gachaPrizes.length);
        const randomPrize = gachaPrizes[randomIndex];
        
        gachaPrizes[randomIndex].unlocked = true;

        display.innerHTML = `
            <div style="margin-bottom: 10px;">
                <img src="${randomPrize.img}" alt="card" style="width: 130px; height: 130px; border-radius: 15px; border: 3px solid #ffd166; object-fit: cover;">
            </div>
            <span style="font-size:15px; color:#ffd166; font-weight:bold;">${randomPrize.name}</span>
        `;
        playSound('success'); 
        showAlert(`🎴 สุ่มได้การ์ดใบใหม่!<br>ระบบทำการปลดล็อกการ์ดใบนี้ในสมุดสะสมเรียบร้อยแล้วครับ!`);
        renderCollection();
    }, 1200);
}

window.onload = function() {
    renderCollection();
};
