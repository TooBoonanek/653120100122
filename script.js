let isThai = true;
        
        function toggleLanguage() {
            const nameElement = document.getElementById('student-name');
            if (isThai) {
                nameElement.innerHTML = 'Boonanek Phonrachom';
                isThai = false;
            } else {
                nameElement.innerHTML = 'บุญเอนก พลราชม';
                isThai = true;
            }
        }