const data =[{
  "id": "1",
  "name": "Ismail Izzani Zainal Nazer",
  "nickname": "ISMAIL IZZANI",
  "birthday": "13 Apr 2000",
  "career": "Malaysian male singer, songwriter, and actor",
  "genre": "Pop",
  "music": '',
  "about": "Ismail is a Malaysian singer, songwriter and male actor. He was a champion in a competition on YouTube and the son of a veteran singer of the 1980s, Suliza Salam.",
  "image" : "https://www.sinarharian.com.my/uploads/images/2019/04/18/275597.jpg"

},
{
  "id": "2",
  "name": "Luqmanul Haqim bin Kamaruddin",
  "nickname": "LUQMAN PODOLSKI",
  "birthday": "2 Mei 1998",
  "career": "Social Media and Comedy, Acting, Music",
  "genre": "malay rap",
  "music": '',
  "about": "Luqman’s name “Podolski” was inspired by football player Lukas Podolski, even though he wasn’t initially a football fan. With 1.3 million followers on Instagram, Luqman continues to entertain and inspire audiences across Malaysia.",
  "image" : "https://viberatecdn.blob.core.windows.net/entity/artist/luqman-podolski-RLNSi"
},
{
  "id": "3",
  "name": "Yunalis binti Mat Zara'ai",
  "nickname": "YUNA",
  "birthday": "14 November 1986",
  "career": "Malaysian singer and actress",
  "genre": "Acoustic, Alternative, Indie Pop",
  "music": '',
  "about": "Yuna is a Malaysian singer-songwriter. She is an independent singer-songwriter. She began writing her own songs when she was 14 years old, and her first performance of her own songs was at the age of 19, after she learned how to play guitar.",
  "image" : "https://www.nme.com/wp-content/uploads/2020/12/Yuna_2020_b.jpg"
},
]


const shopSliderImage = [
  {url:'https://eustore.coldplay.com/cdn/shop/files/Coldplay_5841453505_MoTS2024_Banner_01.jpg?v=1705633406&width=3840'},
  {url:'https://cache.umusic.com/_sites/_halo/zrskt/nwff/omcd.jpg'},
  {url:'https://pbs.twimg.com/media/FL4OUs9UcAQLC1N?format=jpg&name=large'}
]

const shopData = [
  {
    name: "coldplay_shirt_front", 
    displayImage: "https://media.karousell.com/media/photos/products/2023/11/30/coldplay_music_of_the_spheres__1701361899_1a38ab91_progressive.jpg",
    allImages: ['https://media.karousell.com/media/photos/products/2023/11/30/coldplay_music_of_the_spheres__1701361899_1a38ab91_progressive.jpg']
  },
  {
    name: "ts_shirt_1", 
    displayImage: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1695413842-il_1588xN.5356331517_4ivv.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
    allImages:['https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1695413842-il_1588xN.5356331517_4ivv.jpg?crop=1xw:1.00xh;center,top&resize=980:*','https://images.tokopedia.net/img/cache/700/VqbcmM/2023/3/19/91613a67-fec3-455a-8037-d78170b2a34d.png','https://img.thetedellis.com/v7/thetedellis.com/wp-content/uploads/2024/01/Taylor-Swift-The-Eras-Tour-US-Dates-Black-T-Shirt.jpg?org_if_sml=0']
  },
  { 
    name: "ts_shirt_2_front", 
    displayImage: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/3/19/91613a67-fec3-455a-8037-d78170b2a34d.png",
    allImages: ['https://images.tokopedia.net/img/cache/700/VqbcmM/2023/3/19/91613a67-fec3-455a-8037-d78170b2a34d.png','https://img.thetedellis.com/v7/thetedellis.com/wp-content/uploads/2024/01/Taylor-Swift-The-Eras-Tour-US-Dates-Black-T-Shirt.jpg?org_if_sml=0','https://i5.walmartimages.com/seo/Taylor-2023-The-Eras-Tour-T-shirt-Crewneck-Short-Sleeve-Tee-Men-Women-s-Clothes_ecb916c7-c12a-4318-8d47-65d7c1bf9d0d.08a7cfa5c304b6b68cac9458ff68f053.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF']
  },
    
  {
    name: "ismail_izzani_shirt", 
    displayImage: "https://wpstore.my/cdn/shop/products/ISMAIL-IZZANI-ALBUM-COVER-V2-WHITE_1024x1024.png?v=1666838779",
    allImages:['https://wpstore.my/cdn/shop/products/ISMAIL-IZZANI-ALBUM-COVER-V2-WHITE_1024x1024.png?v=1666838779']
  },
  { 
    name: "ismail_izzani_album_cover", 
    displayImage: "https://wpstore.my/cdn/shop/products/Album01_1024x1024.png?v=1643023281", 
    allImages: ['https://wpstore.my/cdn/shop/products/Album01_1024x1024.png?v=1643023281']
  },
  { 
    name: "dolla_playaz_shirt_front", 
    displayImage: "https://playaz.my/cdn/shop/products/20220404playaz0607_1024x1024.jpg?v=1650240496" ,
    allImages: ['https://playaz.my/cdn/shop/products/20220404playaz0607_1024x1024.jpg?v=1650240496','https://playaz.my/cdn/shop/products/20220404playaz0611_1024x1024.jpg?v=1650240496']
  },
  { 
    name: "jb_shirt", 
    displayImage: "https://thehypehousemerch.com/wp-content/uploads/2022/12/5-1.jpg.webp",
    allImages: ['https://thehypehousemerch.com/wp-content/uploads/2022/12/5-1.jpg.webp']
  },
  { 
    name: "jb_hoodie_front", 
    displayImage: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2017%2F08%2Fjustin-bieber-merch-9.jpg?cbr=1&q=90" ,
    allImages: ['https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2017%2F08%2Fjustin-bieber-merch-9.jpg?cbr=1&q=90','https://i.ebayimg.com/images/g/u2AAAOSwMBZjSINn/s-l1200.webp','https://media.karousell.com/media/photos/products/2022/6/11/bieber_stadium_tour_hoodie_1654954961_922f7ca6_progressive.jpg']
  },

]


  
export {data, shopData, shopSliderImage};
  