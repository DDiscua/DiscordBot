import wait from 'wait';

const sleep = async (milliseconds: number) => {
    console.log("Waiting: ", milliseconds);
    await wait(milliseconds);
    console.log("Done Waiting'");
}

export { sleep }