var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

function Cursor(xscale,yscale){
    window.addEventListener("mousemove",function(dets) {
        this.document.querySelector(".cursor").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}

function FirstPageAnim(){
    var tl = gsap.timeline();
    
    tl.from(".nav",{
        y: -10,
        opacity: 0,
        duration:1.5,
        ease: Expo.easeInOut
    })

    tl.to(".boundingelem",{
        y: 0,
        duration:2,
        ease: Expo.easeInOut,
        stagger:0.2,
        delay: -1
    })

    tl.from(".page1footer",{
        y: -10,
        opacity: 0,
        duration:1.5,
        ease: Expo.easeInOut,
        delay: -1
    })

    // tl.from(".hed",{
    //     x: -10,
    //     opacity: 1,
    //     ease: Expo.easeInOut,
    // })
}

function CursorSqueeze(){

    

    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove",function(dets){

        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;


        Cursor(xscale,yscale);

        timeout = setTimeout(function(){
            document.querySelector(".cursor").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        },100);
    });
}

function ImageAnim(){
    
document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        // duration: 0.7,
    });
    });

    elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
    });
});
    // var heading = document.querySelector(".elem h1");
    // elem.addEventListener("mousemove",()=>{
    //     heading.style.color = "#606060";
    //     heading.style.transition = "1s";
    //     heading.style.transform = "translateX(30)";
    // })

}

// function Page1footeranim(){
//     var headanim = document.querySelector(".page1footer");
//     headanim.addEventListener("onmouseenter",function(){
//         console.log("hain jii")

//         headanim.style.transform =rotateX(45);
//     });
// }

Cursor();
FirstPageAnim();
// Page1footeranim()
CursorSqueeze();
ImageAnim();

