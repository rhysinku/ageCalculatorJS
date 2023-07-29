
$(document).ready(function (){



  
    function reset(){
        return $('.result_box h2 span').text('--')
    }
    function resetInput(){
        return $('.input_tag').val('')
    }

    function addErr(){
        return   $('.input_tag').addClass('err'),  $('.input_box label').addClass('err')
    }

    function removeErr(){
        return   $('.input_tag').removeClass('err'),  $('.input_box label').removeClass('err')
    }




    function animateCounter(resultElement, targetNumber) {
        let currentNumber = 0;
        const duration = 2000; // 2 seconds
        const interval = 50; // 50 milliseconds
        const steps = duration / interval;
        const increment = targetNumber / steps;
  
        const timer = setInterval(() => {
          currentNumber += increment;
        //   counterElement.textContent = Math.round(currentNumber);
                  //console.log(`Outside of if ${Math.round(currentNumber)}`)
        resultElement.text(Math.round(currentNumber))

          if (currentNumber >= targetNumber) {
            clearInterval(timer);
            // counterElement.textContent = targetNumber;
            //console.log(`inside of if ${targetNumber}`)
          }
        }, interval);


      }

    
    // Click Function
    $('.submitbtn').on("click", async function(){
        const now = new Date()
        const nowYear = now.getFullYear()
        const nowDay = now.getDate()
        const nowMonth = now.getMonth()
        
        const userDay = parseInt($('.inputDay').val(), 10)
        const userMonth = parseInt($('.inputMonth').val(), 10)
        const userYear = parseInt($('.inputYear').val(), 10)
    //Convert to Date Object
        const myBirthDate = new Date(userYear, userMonth - 1 , userDay)
    
        
        // Day Calculation
        const timeDifferenceInMilliseconds = now - myBirthDate
        const millisecondsPerDay = 24 * 60 * 60 * 1000
        const dayUI = Math.floor(timeDifferenceInMilliseconds/millisecondsPerDay)
    
            let yearUI = nowYear - userYear
            if(nowMonth < userMonth || (nowMonth === userMonth && nowDay < userDay)){
                yearUI--;
            }
            const monthUI = yearUI * 12 + nowMonth - userMonth
    
            // Validate
            const isValidDay = $('.inputDay').val() !== '';
            const isValidMonth = $('.inputMonth').val() !== '';
            const isValidYear = $('.inputYear').val() !== '';

            $('.input1').toggleClass('err' , !isValidDay)
            $('.inputDay').toggleClass('err' , !isValidDay)

            $('.input2').toggleClass('err' , !isValidMonth)
            $('.inputMonth').toggleClass('err' , !isValidMonth)

            $('.input3').toggleClass('err' , !isValidYear)
            $('.inputYear').toggleClass('err' , !isValidYear)
            
         if(!isValidDay || !isValidMonth || !isValidYear){
            reset()
            console.log('No Value') 
          }else{
            // $('.resultYear').text(animateCounter(yearUI));
            await animateCounter($('.resultYear'), yearUI)
            await animateCounter($('.resultMonth'), monthUI)
            await animateCounter($('.resultday'), dayUI)
            removeErr()
          } 
    })
    
    // remove letter input
    $('.input_tag').on("keypress", (event) =>{
        const key = event.key;
        if(/[a-zA-A]/.test(key)){
            event.preventDefault();
        }
    })
    

    $('.inputDay').on('input' , function(){
        const inputValue = $(this).val()

        if(inputValue == ''){
            $(this).val('')
        }else{

        const numericValue = inputValue.replace(/\D/g, "");
        const limitedValue =numericValue.slice(0,2)
        const validateValue = Math.min(parseInt(limitedValue) || 0, 31);

        $(this).val(validateValue);
            }
    })


    $('.inputMonth').on('input' , function(){
        const inputValue = $(this).val()

        if(inputValue == ''){
            $(this).val('')
        }else{

        const numericValue = inputValue.replace(/\D/g, "");
        const limitedValue =numericValue.slice(0,2)
        const validateValue = Math.min(parseInt(limitedValue) || 0, 12);

        $(this).val(validateValue);
            }
    })

    $('.inputYear').on('input' , function(){
        const inputValue = $(this).val()

        if(inputValue == ''){
            $(this).val('')
        }else{

        const numericValue = inputValue.replace(/\D/g, "");
        const limitedValue =numericValue.slice(0,4)

        $(this).val(limitedValue);
            }
    })


    reset()
    resetInput()
    removeErr()
    
    });
    
    