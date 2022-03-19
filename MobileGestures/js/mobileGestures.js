function mobileGestures(sel, options)
{
    
    let maxRangeTap = 15;   //(Pixel) allowed movement range to a tap 
    let minMovementRange = 100; //(Pixel) minimal movement range to set a swipe gesture

    let maxTimeOfMultitouch = 50; //(miliseconds) waiting time to enable multitouch
    let maxTimeTap = 125;   //(milliseconds) maximum waiting time for a tap
    let maxTimeToubleTap = 250; //(milliseconds) maximum waiting time for a double tap
    let minTimeLongTap = 400; //(milliseconds) minimum time tapping to set long tap
    let delayGestureTime = 400; //(milliseconds) delay time before you can use a new gesture
    
    
    let doubleTapFlag = false;
    let delayTapFlag = false;
    let touches = new Array;      
    let fingers = new Array;  

    const self = {};
    const oneFingerTapEvent = new Event('onOneFingerTap');
    const twoFingerTapEvent = new Event('onTwoFingerTap');
    const threeFingerTapEvent = new Event('onThreeFingerTap');
    const fourFingerTapEvent = new Event('onFourFingerTap');
    const fiveFingerTapEvent = new Event('onFiveFingerTap');

    const oneFingerDoubleTapEvent = new Event('onOneFingerDoubleTap');
    const twoFingerDoubleTapEvent = new Event('onTwoFingerDoubleTap');
    const threeFingerDoubleTapEvent = new Event('onThreeFingerDoubleTap');
    const fourFingerDoubleTapEvent = new Event('onFourFingerDoubleTap');
    const fiveFingerDoubleTapEvent = new Event('onFiveFingerDoubleTap');

    const oneFingerLongTapEvent = new Event('onOneFingerLongTap');
    const twoFingerLongTapEvent = new Event('onTwoFingerLongTap');
    const threeFingerLongTapEvent = new Event('onThreeFingerLongTap');
    const fourFingerLongTapEvent = new Event('onFourFingerLongTap');
    const fiveFingerLongTapEvent = new Event('onFiveFingerLongTap');

    const oneFingerSwipeLeftEvent = new Event('onOneFingerSwipeLeft');
    const twoFingerSwipeLeftEvent = new Event('onTwoFingerSwipeLeft');
    const threeFingerSwipeLeftEvent = new Event('onThreeFingerSwipeLeft');
    const fourFingerSwipeLeftEvent = new Event('onFourFingerSwipeLeft');
    const fiveFingerSwipeLeftEvent = new Event('onFiveFingerSwipeLeft');

    const oneFingerSwipeRightEvent = new Event('onOneFingerSwipeRight');
    const twoFingerSwipeRightEvent = new Event('onTwoFingerSwipeRight');
    const threeFingerSwipeRightEvent = new Event('onThreeFingerSwipeRight');
    const fourFingerSwipeRightEvent = new Event('onFourFingerSwipeRight');
    const fiveFingerSwipeRightEvent = new Event('onFiveFingerSwipeRight');

    const oneFingerSwipeUpEvent = new Event('onOneFingerSwipeUp');
    const twoFingerSwipeUpEvent = new Event('onTwoFingerSwipeUp');
    const threeFingerSwipeUpEvent = new Event('onThreeFingerSwipeUp');
    const fourFingerSwipeUpEvent = new Event('onFourFingerSwipeUp');
    const fiveFingerSwipeUpEvent = new Event('onFiveFingerSwipeUp');

    const oneFingerSwipeDownEvent = new Event('onOneFingerSwipeDown');
    const twoFingerSwipeDownEvent = new Event('onTwoFingerSwipeDown');
    const threeFingerSwipeDownEvent = new Event('onThreeFingerSwipeDown');
    const fourFingerSwipeDownEvent = new Event('onFourFingerSwipeDown');
    const fiveFingerSwipeDownEvent = new Event('onFiveFingerSwipeDown');

    loadOptions();

    sel.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if(delayTapFlag)
        {
            return;
        }  
        Array.from(e.changedTouches).forEach(element => {
            let t = 
            {
                id: element.identifier,
                startTime: e.timeStamp,
                startPageX: element.pageX,
                startPageY: element.pageY,
            }         
            if(!fingers.includes(obj => obj.id === t.id) && !doubleTapFlag)
            {
                if(fingers.length > 0)
                {                    
                    if(e.timeStamp - fingers[fingers.length-1].startTime <= maxTimeOfMultitouch)
                    {
                        fingers.push(t);
                    }
                }else
                {
                    fingers.push(t);
                }            
            }
        });        
    });

    sel.addEventListener('touchend', function(e) {
        e.preventDefault();      
        if(delayTapFlag)
        {
            return;
        }    
        Array.from(e.changedTouches).forEach(element => {                     
            let index = fingers.findIndex(obj => obj.id === element.identifier);
            if(index != -1)
            {                
                fingers[index].endTime = e.timeStamp;
                fingers[index].endPageX = element.pageX;
                fingers[index].endPageY = element.pageY;
                if(!touches.includes(obj => obj.id === fingers[index].id))
                {
                    touches.push(fingers[index]);
                }
                fingers.splice(index, 1);
            }
        });     
        if(fingers.length == 0)
        {            
            validateTouch(touches);
        }
    });

    function loadOptions()
    {
        if(options!=undefined)
        {
            if(options.maxRangeTap!=null && options.maxRangeTap!=null){maxRangeTap = options.maxRangeTap;}
            if(options.minMovementRange!=null && options.minMovementRange!=null){minMovementRange = options.minMovementRange;}
            if(options.maxTimeOfMultitouch!=null && options.maxTimeOfMultitouch!=null){maxTimeOfMultitouch = options.maxTimeOfMultitouch;}
            if(options.maxTimeTap!=null && options.maxTimeTap!=null){maxTimeTap = options.maxTimeTap;}
            if(options.maxTimeToubleTap!=null && options.maxTimeToubleTap!=null){maxTimeToubleTap = options.maxTimeToubleTap;}
            if(options.minTimeLongTap!=null && options.minTimeLongTap!=null){minTimeLongTap = options.minTimeLongTap;}
            if(options.delayGestureTime!=null && options.delayGestureTime!=null){delayGestureTime = options.delayGestureTime;}
        }
    }

    function dispatchTouches(touchesCount,touchGesture)
    {
        touches.splice(0,touches.length);
        let count = 0;
        let interval = setInterval(countDown,delayGestureTime);
        delayTapFlag = true;
        function countDown()
        {
            if(count<=0)
            {
                clearInterval(interval);
                if(delayTapFlag){
                    delayTapFlag = false;
                }
            }else
            {
                count--;
            }
        }
        switch(touchesCount)
        {
            case 1:
                //show("one finger");
                switch(touchGesture)
                {
                    case 0:
                        this.dispatchEvent(oneFingerTapEvent);
                        break;
                    case 1:
                        this.dispatchEvent(oneFingerDoubleTapEvent);
                        break;
                    case 2:
                        this.dispatchEvent(oneFingerLongTapEvent);
                        break;
                    case 3:
                        this.dispatchEvent(oneFingerSwipeLeftEvent);
                        break;
                    case 4:
                        this.dispatchEvent(oneFingerSwipeUpEvent);
                        break;
                    case 5:
                        this.dispatchEvent(oneFingerSwipeRightEvent);
                        break;
                    case 6:
                        this.dispatchEvent(oneFingerSwipeDownEvent);
                        break;
                }
                break;
            case 2:
                //show("two fingers");
                switch(touchGesture)
                {
                    case 0:
                        this.dispatchEvent(twoFingerTapEvent);
                        break;
                    case 1:
                        this.dispatchEvent(twoFingerDoubleTapEvent);
                        break;
                    case 2:
                        this.dispatchEvent(twoFingerLongTapEvent);
                        break;
                    case 3:
                        this.dispatchEvent(twoFingerSwipeLeftEvent);
                        break;
                    case 4:
                        this.dispatchEvent(twoFingerSwipeUpEvent);
                        break;
                    case 5:
                        this.dispatchEvent(twoFingerSwipeRightEvent);
                        break;
                    case 6:
                        this.dispatchEvent(twoFingerSwipeDownEvent);
                        break;
                }
                break;
            case 3:
                //show("three fingers");
                switch(touchGesture)
                {
                    case 0:
                        this.dispatchEvent(threeFingerTapEvent);
                        break;
                    case 1:
                        this.dispatchEvent(threeFingerDoubleTapEvent);
                        break;
                    case 2:
                        this.dispatchEvent(threeFingerLongTapEvent);
                        break;
                    case 3:
                        this.dispatchEvent(threeFingerSwipeLeftEvent);
                        break;
                    case 4:
                        this.dispatchEvent(threeFingerSwipeUpEvent);
                        break;
                    case 5:
                        this.dispatchEvent(threeFingerSwipeRightEvent);
                        break;
                    case 6:
                        this.dispatchEvent(threeFingerSwipeDownEvent);
                        break;
                }
                break;
            case 4:
                //show("Four fingers");
                switch(touchGesture)
                {
                    case 0:
                        this.dispatchEvent(fourFingerTapEvent);
                        break;
                    case 1:
                        this.dispatchEvent(fourFingerDoubleTapEvent);
                        break;
                    case 2:
                        this.dispatchEvent(fourFingerLongTapEvent);
                        break;
                    case 3:
                        this.dispatchEvent(fourFingerSwipeLeftEvent);
                        break;
                    case 4:
                        this.dispatchEvent(fourFingerSwipeUpEvent);
                        break;
                    case 5:
                        this.dispatchEvent(fourFingerSwipeRightEvent);
                        break;
                    case 6:
                        this.dispatchEvent(fourFingerSwipeDownEvent);
                        break;
                }
                break;
            case 5:
                //show("Five fingers");
                switch(touchGesture)
                {
                    case 0:
                        this.dispatchEvent(fiveFingerTapEvent);
                        break;
                    case 1:
                        this.dispatchEvent(fiveFingerDoubleTapEvent);
                        break;
                    case 2:
                        this.dispatchEvent(fiveFingerLongTapEvent);
                        break;
                    case 3:
                        this.dispatchEvent(fiveFingerSwipeLeftEvent);
                        break;
                    case 4:
                        this.dispatchEvent(fiveFingerSwipeUpEvent);
                        break;
                    case 5:
                        this.dispatchEvent(fiveFingerSwipeRightEvent);
                        break;
                    case 6:
                        this.dispatchEvent(fiveFingerSwipeDownEvent);
                        break;
                }
                break;
        } 
    }

    function validateTouch(touches)
    {        
        let time = touchTime(touches);
        let movement = touchMovement(touches);
        let touchesCount = touches.length;
        if(touchesCount > 0 && touchesCount <=5)
        {
            if(movement == 0)
            {
                if(time >= minTimeLongTap)
                {
                    //show("Long Tap");
                    dispatchTouches(touchesCount,2);
                }
                if(time <= maxTimeTap)
                {
                    let count = 0;
                    let interval;
                    if(doubleTapFlag)
                    {               
                        doubleTapFlag = false;
                        clearInterval(interval);
                        //show("double tap");
                        dispatchTouches(touchesCount,1);
                    }
                    else
                    {
                        doubleTapFlag = true;                                 
                        interval = setInterval(countDown,maxTimeToubleTap);
                        function countDown()
                        {
                            if(count<=0)
                            {
                                clearInterval(interval);
                                if(doubleTapFlag){
                                    doubleTapFlag = false;
                                    //show("single tap");                                
                                    dispatchTouches(touchesCount,0);
                                }
                            }else
                            {
                                count--;
                            }
                        }
                    }
                }
            }else
            {
                dispatchTouches(touchesCount,(movement+2));
            } 
        } else
        {
            touches.splice(0,touches.length);
            if(touchesCount == 6)
            {
                console.log("Mobile Gestures made by DSCADX");
            }
        }
    }

    function touchTime(touches)
    {
        let time=0;
        touches.forEach(t =>{
            time+= (t.endTime - t.startTime);
        });     
        time =  time/touches.length  
        return time;
    }

    function touchMovement(touches)
    {
        let distX = 0;
        let distY = 0;
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;
        touches.forEach(t =>{
            distX += Math.abs(t.endPageX - t.startPageX);
            distY += Math.abs(t.endPageY - t.startPageY); 
            startX += t.startPageX;
            endX += t.endPageX;
            startY += t.startPageY;
            endY += t.endPageY;
        });    
        distX =  distX/touches.length;
        distY =  distY/touches.length;
        startX = startX/touches.length;
        endX =   endX/touches.length;
        startY = startY/touches.length;
        endY =   endY/touches.length;
        
        if(distX <= maxRangeTap && distY <= maxRangeTap)
        {
            ////show("No movement");
            return 0;
        }
        if(distX > distY)
        {
            if(distX>=minMovementRange)
            {
                ////show("horizontal");        
                if(startX>endX)
                {
                    ////show("Left");
                    return 1;                                            
                }else
                {
                    ////show("Right");
                    return 3;   
                }
            }        
        }else
        {
            if(distY>=minMovementRange)
            {
                ////show("vertical");
                if(startY>endY)
                {            
                    ////show("up");
                    return 2;   
                }else
                {
                    ////show("down"); 
                    return 4;   
                }
            }
        }
    }


    self.onOneFingerTap = (callback) => 
    {            
            this.addEventListener('onOneFingerTap', function(e) {
                callback();
            }, false);            
    }
    self.onOneFingerDoubleTap = (callback) => 
    {            
            this.addEventListener('onOneFingerDoubleTap', function(e) {
                callback();
            }, false);            
    }
    self.onOneFingerLongTap = (callback) => 
    {            
            this.addEventListener('onOneFingerLongTap', function(e) {
                callback();
            }, false);            
    }
    self.onOneFingerSwipeLeft = (callback) => 
    {            
            this.addEventListener('onOneFingerSwipeLeft', function(e) {
                callback();
            }, false);            
    }
    self.onOneFingerSwipeUp = (callback) => 
    {            
            this.addEventListener('onOneFingerSwipeUp', function(e) {
                callback();
            }, false);            
    }
    self.onOneFingerSwipeRight = (callback) => 
    {            
            this.addEventListener('onOneFingerSwipeRight', function(e) {
                callback();
            }, false);            
    }
    self.onOneFingerSwipeDown = (callback) => 
    {            
            this.addEventListener('onOneFingerSwipeDown', function(e) {
                callback();
            }, false);            
    }


    self.onTwoFingerTap = (callback) => 
    {            
            this.addEventListener('onTwoFingerTap', function(e) {
                callback();
            }, false);            
    }
    self.onTwoFingerDoubleTap = (callback) => 
    {            
            this.addEventListener('onTwoFingerDoubleTap', function(e) {
                callback();
            }, false);            
    }
    self.onTwoFingerLongTap = (callback) => 
    {            
            this.addEventListener('onTwoFingerLongTap', function(e) {
                callback();
            }, false);            
    }
    self.onTwoFingerSwipeLeft = (callback) => 
    {            
            this.addEventListener('onTwoFingerSwipeLeft', function(e) {
                callback();
            }, false);            
    }
    self.onTwoFingerSwipeUp = (callback) => 
    {            
            this.addEventListener('onTwoFingerSwipeUp', function(e) {
                callback();
            }, false);            
    }
    self.onTwoFingerSwipeRight = (callback) => 
    {            
            this.addEventListener('onTwoFingerSwipeRight', function(e) {
                callback();
            }, false);            
    }
    self.onTwoFingerSwipeDown = (callback) => 
    {            
            this.addEventListener('onTwoFingerSwipeDown', function(e) {
                callback();
            }, false);            
    }


    self.onThreeFingerTap = (callback) => 
    {            
            this.addEventListener('onThreeFingerTap', function(e) {
                callback();
            }, false);            
    }
    self.onThreeFingerDoubleTap = (callback) => 
    {            
            this.addEventListener('onThreeFingerDoubleTap', function(e) {
                callback();
            }, false);            
    }
    self.onThreeFingerLongTap = (callback) => 
    {            
            this.addEventListener('onThreeFingerLongTap', function(e) {
                callback();
            }, false);            
    }
    self.onThreeFingerSwipeLeft = (callback) => 
    {            
            this.addEventListener('onThreeFingerSwipeLeft', function(e) {
                callback();
            }, false);            
    }
    self.onThreeFingerSwipeUp = (callback) => 
    {            
            this.addEventListener('onThreeFingerSwipeUp', function(e) {
                callback();
            }, false);            
    }
    self.onThreeFingerSwipeRight = (callback) => 
    {            
            this.addEventListener('onThreeFingerSwipeRight', function(e) {
                callback();
            }, false);            
    }
    self.onThreeFingerSwipeDown = (callback) => 
    {            
            this.addEventListener('onThreeFingerSwipeDown', function(e) {
                callback();
            }, false);            
    }


    self.onFourFingerTap = (callback) => 
    {            
            this.addEventListener('onFourFingerTap', function(e) {
                callback();
            }, false);            
    }
    self.onFourFingerDoubleTap = (callback) => 
    {            
            this.addEventListener('onFourFingerDoubleTap', function(e) {
                callback();
            }, false);            
    }
    self.onFourFingerLongTap = (callback) => 
    {            
            this.addEventListener('onFourFingerLongTap', function(e) {
                callback();
            }, false);            
    }
    self.onFourFingerSwipeLeft = (callback) => 
    {            
            this.addEventListener('onFourFingerSwipeLeft', function(e) {
                callback();
            }, false);            
    }
    self.onFourFingerSwipeUp = (callback) => 
    {            
            this.addEventListener('onFourFingerSwipeUp', function(e) {
                callback();
            }, false);            
    }
    self.onFourFingerSwipeRight = (callback) => 
    {            
            this.addEventListener('onFourFingerSwipeRight', function(e) {
                callback();
            }, false);            
    }
    self.onFourFingerSwipeDown = (callback) => 
    {            
            this.addEventListener('onFourFingerSwipeDown', function(e) {
                callback();
            }, false);            
    }



    self.onFiveFingerTap = (callback) => 
    {            
            this.addEventListener('onFiveFingerTap', function(e) {
                callback();
            }, false);            
    }
    self.onFiveFingerDoubleTap = (callback) => 
    {            
            this.addEventListener('onFiveFingerDoubleTap', function(e) {
                callback();
            }, false);            
    }
    self.onFiveFingerLongTap = (callback) => 
    {            
            this.addEventListener('onFiveFingerLongTap', function(e) {
                callback();
            }, false);            
    }
    self.onFiveFingerSwipeLeft = (callback) => 
    {            
            this.addEventListener('onFiveFingerSwipeLeft', function(e) {
                callback();
            }, false);            
    }
    self.onFiveFingerSwipeUp = (callback) => 
    {            
            this.addEventListener('onFiveFingerSwipeUp', function(e) {
                callback();
            }, false);            
    }
    self.onFiveFingerSwipeRight = (callback) => 
    {            
            this.addEventListener('onFiveFingerSwipeRight', function(e) {
                callback();
            }, false);            
    }
    self.onFiveFingerSwipeDown = (callback) => 
    {            
            this.addEventListener('onFiveFingerSwipeDown', function(e) {
                callback();
            }, false);            
    }

    return self;
}
