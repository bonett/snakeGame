var draw = (function () {

    var bodySnake = function (x, y) {
        context.fillStyle = '#0063F3';
        context.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        context.strokeStyle = '#A900F3';
        context.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }

    var eat = function (x, y) {
        context.fillStyle = 'yellow';
        context.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        context.fillStyle = 'red';
        context.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
    }

    var scoreTotal = function () {
        score_value.innerHTML = score;
        if (sessionStorage.getItem('LAST_SCORE') < score){
            var score_text = document.getElementById('score_text');
            score_text.classList.add('record');
            score_text.classList.add('gold');
        }
    }

    var getRandomInt = function(min, max) {
        min = Math.ceil(4);
        max = Math.floor(10);
        return Math.floor(Math.random() * (max - min)) + min;
      }

    var drawSnake = function () {
        var length = 2;
            snake  = [];

        for (var i = length - 1; i >= 0; i--) {
            snake.push({ x: i, y: 0 });
        }
    }

    var getScore = function() {
        var achieved = document.getElementById('score_achieved');
        if(sessionStorage.getItem('LAST_SCORE')) {
            if (sessionStorage.getItem('LAST_SCORE') > score) {
                achieved.innerHTML = 'Try to improve the best score: ' + sessionStorage.getItem('LAST_SCORE');
            } else {
                achieved.innerHTML = 'Awesome, your score is the best: ' + score;
            }
        } else {
            achieved.innerHTML = 'Your score is: ' + score;
        }
    }

    var openModal = function() {
        var modal = document.getElementById("game_over_modal");
        modal.style.display = "block";
        getScore();
        playAgain();
    }

    var playAgain = function () {
        var button_again = document.getElementById('play_again');

        button_again.addEventListener("click", function(){
            location.reload();
        });
    }

    var setLastScore = function() {
        if (sessionStorage.getItem('LAST_SCORE') < score) {
            sessionStorage.setItem('LAST_SCORE', score_value.innerHTML);
        }
    }

    var getDirectionKeyReverse = function() {

        document.onkeydown = function(event) {

            keyCode = window.event.keyCode; 
            keyCode = event.keyCode;
    
            switch(keyCode) {
            
            case 37: 
              if (direction != 'right') {
                direction = 'right';
              }
              break;
    
            case 39:
              if (direction != 'left') {
                direction = 'left';
              }
              break;
    
            case 38:
              if (direction != 'down') {
                direction = 'down';
              }
              break;
    
            case 40:
              if (direction != 'up') {
                direction = 'up';
              }
              break;
              }
          }
    }

    var paint = function () {
        context.fillStyle = '#000000';
        context.fillRect(0, 0, w, h);
        context.strokeStyle = '#fff';
        context.strokeRect(0, 0, w, h);

        button_start.setAttribute('disabled', true);

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        if (direction == 'right') {
            snakeX++;
        } else if (direction == 'left') {
            snakeX--;
        } else if (direction == 'up') {
            snakeY--;
        } else if (direction == 'down') {
            snakeY++;
        }

        if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || crash(snakeX, snakeY, snake)) {

            setLastScore();
            openModal();

            loop = clearInterval(loop);
            return;
        }

        if (snakeX == food.x && snakeY == food.y) {
            var tail = { x: snakeX, y: snakeY };
            score++;

            launchFood();

            if(score_value.innerHTML > reverseLimit) {
                getDirectionKeyReverse();
            }
        } else {
            var tail   = snake.pop();
                tail.x = snakeX;
                tail.y = snakeY;
        }

        snake.unshift(tail);

        for (var i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
        }

        eat(food.x, food.y);
        
        scoreTotal();
    }

    var getDirectionKey = function() {

        document.onkeydown = function(event) {

            keyCode = window.event.keyCode; 
            keyCode = event.keyCode;
    
            switch(keyCode) {
            
            case 37: 
              if (direction != 'right') {
                direction = 'left';
              }
              break;
    
            case 39:
              if (direction != 'left') {
                direction = 'right';
              }
              break;
    
            case 38:
              if (direction != 'down') {
                direction = 'up';
              }
              break;
    
            case 40:
              if (direction != 'up') {
                direction = 'down';
              }
              break;
              }
          }
    }

    var launchFood = function () {
        food = {
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }

        for (var i = 0; i > snake.length; i++) {

            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            if (food.x === snakeX && food.y === snakeY || food.y === snakeY && food.x === snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }

    var crash = function (x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y) return true;
        }
        return false;
    }

    var init = function () {
        getDirectionKey();
        direction = 'down';
        drawSnake();
        launchFood();
        loop = setInterval(paint, 80);
    }


    return {
        init: init
    };
}());