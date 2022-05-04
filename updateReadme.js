// Include node fs (file stream) and https modules
const fs = require('fs');
const https = require('https');

// API endpoint
const url = 'https://dev.to/api/articles?username=<AdrianUDAW>';

function readWriteAsync() {
  // Get articles using HTTPS
  https.get(url, (res) => {
    res.setEncoding('utf8');

    // Set variable body to response data from API
    let body = '';
    res.on('data', (data) => body += data);

    res.on('end', () => {
      // Parse the JSON response
      body = JSON.parse(body);

      // Shorten array to latest 3 articles
      body = body.slice(0, 3);

      // Create string of markdown to be inserted
      const articles = `\n - [${body[0].title}](${body[0].url})\n - [${body[1].title}](${body[1].url})\n - [${body[2].title}](${body[2].url})\n \n`;

      // Update README using FS
      fs.readFile('README.md', 'utf-8', (err, data) => {
        if (err) {
          throw err;
        }

        // Replace text using regex: "I'm writing: ...replace... ![Build"
        // Regex101.com is a lifesaver!
        const updatedMd = data.replace(
          /(?<=I'm writing:\n)[\s\S]*(?=\!\[Build)/gim,
          articles
        );

        // Write the new README
        fs.writeFile('README.md', updatedMd, 'utf-8', (err) => {
          if (err) { 
            throw err;
          }

          console.log('README update complete.');
        });
      });
    });
  });
}

// Call the function
readWriteAsync();



        var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
        };

        TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
                that.tick();
            }, delta);
        };

        window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
        };
