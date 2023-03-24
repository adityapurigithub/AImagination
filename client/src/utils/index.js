import { surprisePrompts } from "../constants";

import FileSaver from "file-saver";

//a function for getting-generating random prompts..........
export function getRandomPropmts(prompts) {
  //a random index...
  const randomIndex = Math.floor(Math.random() * surprisePrompts.length);

  const randomPrompts = surprisePrompts[randomIndex];

  //if we get same random prompts again-again.......................
  if (randomPrompts === prompts) return getRandomPropmts(prompts);
  //................................................................

  return randomPrompts;
}

//this func is used to download images.............
export async function downloadImage(_id, photo) {
  //file saver is used to download and save the image ...
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
