let menu = document.querySelector('#mobile-menu');
let sideBar = document.querySelector('.sidebar');
let blocker = document.querySelector('.dark-blocker');
let popupImageContainer = document.querySelector('.popup-image-container');
let popupImage = document.querySelector('.popup-img');
let images = document.querySelectorAll('.img');
let searchBox = document.querySelector('#search-box');
let categoryButton = document.querySelectorAll(".category-btn");
let typeButton = document.querySelectorAll(".type-btn");
let darkToggleButton = document.querySelector("#dark-theme-toggle");

//======= FUNCTION ON CLICKING MENU ON MOBILE =======//
menu.onclick = () => {
	//close sidebar and change mobile menu icon and toggle blocker
	menu.classList.toggle('fa-times');
	sideBar.classList.toggle('active');
	blocker.classList.toggle('active');
};

//======= FUNCTION ON CLICKING THE POPUP IMAGE =======//
popupImageContainer.onclick = () => {
	//remove the popup image to return to original view
	popupImageContainer.style.display = 'none';
};

//======= FUNCTION ON SCROLL =======//
window.onscroll = () => {
	//close sidebar and change mobile menu icon
	sideBar.classList.remove("active");
	menu.classList.remove("fa-times");
	//if the block exists, remove it
	if (blocker.classList.contains("active")) {
		blocker.classList.remove("active");
	}
}

//======= FUNCTION TO POPUP THE CHOSEN IMAGE =======//
images.forEach((img) => {
	//add an onlick function to all of them
	img.onclick = () => {
		//get the src of each image in gallery
		let imgSrc = img.getAttribute('src');
		//then set the current image of popup image to the selected image
		popupImage.src = imgSrc;
		//then display it
		popupImageContainer.style.display = 'flex';
	}
});

//======= FUNCTION TO SEARCH BY KEYWORDS =======//
searchBox.oninput = () => {
	typeButton.forEach((otherBtn) => {otherBtn.classList.remove("active");});
	categoryButton.forEach((otherBtn) => {otherBtn.classList.remove("active");});

	let searchValue = searchBox.value.toLowerCase();
	//compare the Searchvalue to every image's keywords
	images.forEach((img) => {
		let dataSearch = img.getAttribute('img-keywords');
		//if the current data search value is in the image's keywords, we display them
		if (dataSearch.indexOf(searchValue) != -1) {img.style.display = 'inline-block';}
		//else we hide them
		else {img.style.display = 'none';}
	});
};

//======= FUNCTION TO SEARCH BY CATEGORY =======//
categoryButton.forEach((btn) => {
	btn.onclick = () => {
		typeButton.forEach((otherBtn) => {otherBtn.classList.remove("active");});
		categoryButton.forEach((otherBtn) => {otherBtn.classList.remove("active");});
		searchBox.value = '';

		//then take the img-category value of the button
		let dataCategory = btn.getAttribute('img-category');
		//then compare the img-category value to the img-cat value of every image
		images.forEach((img) => {
			let dataCat = img.getAttribute("img-cat"); //we take the img-cat value of image
			//if img-category value of the button is all, show all image
			if (dataCategory === "all") {img.style.display = "inline-block";}
			//if the value of img-category is the same as img-cat value of the image, show it
			else if (dataCategory === dataCat) {img.style.display = "inline-block";}
			//if not, hide it
			else {img.style.display = "none";}
		});
		//add active class to the button currently selected
		btn.classList.add('active');
	};
});

//======= FUNCTION TO SEARCH BY FILE TYPE =======//
typeButton.forEach((btn) => {
	btn.onclick = () => {
		typeButton.forEach((otherBtn) => {otherBtn.classList.remove("active");});
		categoryButton.forEach((otherBtn) => {otherBtn.classList.remove("active");});
		searchBox.value = "";

		//then take the img-type value of the button
		let dataType = btn.getAttribute("img-type");
		//then we compare the img-type value to the img-cat value of every image
		images.forEach((img) => {
			//seperate file name via . then pop() to take the file extension type
			let ImgType = img.getAttribute("src").split(".").pop();
			//if img-type value of the button is all, show all image
			if (dataType === "all") {img.style.display = "inline-block";}
			//if the value of img-type is the same as img-cat value of the image, show it
			else if (dataType === ImgType) {img.style.display = "inline-block";}
			//if not, hide it
			else {img.style.display = "none";}
		});
		//add active class to the button currently selected
		btn.classList.add("active");
	};
});

//======= FUNCTION TO WAIT FOR ENTIRE FILES TO PARSE FIRST =======//
let checkIfDocumentFullyLoaded = () => {
	if (document.readyState === "complete") {
		// make the entire page visible
		document.querySelector('body').removeAttribute('style');
		// remove the interval call to this function
		clearInterval(checkPageLoad);
	}
};
let checkPageLoad = setInterval(checkIfDocumentFullyLoaded, 100);

//======= FUNCTION TO TOGGLE TO DARK MODE =======//
let documentRoot = document.querySelector(":root");
let isDarkMode = false;

darkToggleButton.onclick = () => {
	isDarkMode = !isDarkMode;

	if (isDarkMode) {
		// switch to dark-mode
		documentRoot.style.setProperty("--background-color", "#010409");
		documentRoot.style.setProperty("--sidebar-bg", "#0D1117");
		documentRoot.style.setProperty("--text-color", "#eee");
		documentRoot.style.setProperty("--component-bg", "#666");
	}

	else {
		// switch to light-mode
		documentRoot.style.setProperty("--background-color", "#eee");
		documentRoot.style.setProperty("--sidebar-bg", "white");
		documentRoot.style.setProperty("--text-color", "#333");
		documentRoot.style.setProperty("--component-bg", "#eee");
	}
}
