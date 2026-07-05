import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { NewCarsPage } from '../src/pages/NewCarsPage';
import { CarDetailsPage } from '../src/pages/CarDetailsPage';

test('verify Tata Nexon on-road price from CarWale', async ({ page }) => {
  const homePage = new HomePage(page);
  const newCarsPage = new NewCarsPage(page);
  const carDetailsPage = new CarDetailsPage(page);

  await homePage.openHomePage();
  await homePage.navigateToNewCars();
  await newCarsPage.searchForCar('Tata Nexon');
  await newCarsPage.openTataNexon();
  await carDetailsPage.openOnRoadPriceSection();

  const priceText = await carDetailsPage.getOnRoadPriceText();
  console.log('On-road price text:', priceText);

  expect(priceText).toContain('Rs.');
});
