import {
  randomNumberList,
  useAnimatedCounter,
} from "@/provider/AnimatedCounterProvider";
import { motion } from "framer-motion";
import { Switch } from "./Switch";

export const ConfigureNumbers = () => {
  const {
    number,
    setNumber,
    isCollapsed,
    isFormatted,
    setFormatted,
    setCollapsed,
    setTyping,
    setRandomized,
    isRandomized,
    currentRandomNumber,
    setCurrentRandomNumber,
  } = useAnimatedCounter();

  return (
    <div className="mx-auto relative z-20 mb-16 sm:mb-8 bg-[rgba(255,_255,_255,_1)] p-1 rounded-3xl min-w-[95%] sm:min-w-[392px]">
      <button
        onClick={() => {
          setCollapsed((prev) => !prev);
        }}
        className="px-5 py-3 flex items-center gap-2 w-full rounded-t-[inherit]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6673 5.83331H3.33398M11.6673 5.83331C11.6673 4.45206 12.7861 3.33331 14.1673 3.33331C15.5486 3.33331 16.6673 4.45206 16.6673 5.83331C16.6673 7.21456 15.5486 8.33331 14.1673 8.33331C12.7861 8.33331 11.6673 7.21456 11.6673 5.83331ZM16.6673 14.1666H10.0007M10.0007 14.1666C10.0007 15.5479 8.8819 16.6666 7.50065 16.6666C6.1194 16.6666 5.00065 15.5479 5.00065 14.1666M10.0007 14.1666C10.0007 12.7854 8.8819 11.6666 7.50065 11.6666C6.1194 11.6666 5.00065 12.7854 5.00065 14.1666M5.00065 14.1666H3.33398"
            stroke="#07091E"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>

        <h2 className="text-[#07091F] flex-1 text-base font-medium tracking-[-0.32px]">
          Configure numbers
        </h2>
        <button>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.66667 2.66667C8.66667 2.29848 8.96514 2 9.33333 2H13.3333C13.7015 2 14 2.29848 14 2.66667V6.66667C14 7.03486 13.7015 7.33333 13.3333 7.33333C12.9651 7.33333 12.6667 7.03486 12.6667 6.66667V4.27614L9.80474 7.13807C9.54439 7.39842 9.12228 7.39842 8.86193 7.13807C8.60158 6.87772 8.60158 6.45561 8.86193 6.19526L11.7239 3.33333H9.33333C8.96514 3.33333 8.66667 3.03486 8.66667 2.66667ZM2.66667 8.66667C3.03486 8.66667 3.33333 8.96514 3.33333 9.33333V11.7239L6.19526 8.86193C6.45561 8.60158 6.87772 8.60158 7.13807 8.86193C7.39842 9.12228 7.39842 9.54439 7.13807 9.80474L4.27614 12.6667H6.66667C7.03486 12.6667 7.33333 12.9651 7.33333 13.3333C7.33333 13.7015 7.03486 14 6.66667 14H2.66667C2.29848 14 2 13.7015 2 13.3333V9.33333C2 8.96514 2.29848 8.66667 2.66667 8.66667Z"
              fill="#BCBCBC"
            />
          </svg>
        </button>
      </button>
      {isCollapsed ? null : (
        <div className="p-5 border-t border-black/[0.04] space-y-4">
          <div>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Amount
              <input
                value={number}
                className="w-full bg-[#f3f3f3] caret-orange-600 font-normal text-base h-[44px] rounded-xl p-2.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                id="input-num"
                inputMode="numeric"
                onKeyDown={(evt) => {
                  const isNumber = /[0-9]/.test(evt.key);
                  const isMetaKey = evt.metaKey || evt.ctrlKey;
                  const backSpace = evt.key === "Backspace";
                  const isArrowKey = evt.key.includes("Arrow");

                  setTyping(true);

                  if (!isNumber && !isMetaKey && !isArrowKey && !backSpace) {
                    evt.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setTyping(false);
                  setNumber(
                    isNaN(e.target.valueAsNumber)
                      ? ""
                      : (e.target.valueAsNumber as any)
                  );
                }}
              />
            </label>
          </div>

          <Switch
            checked={isFormatted}
            onCheckedChange={(t) => {
              setFormatted(t);
            }}
            id="format-number"
            label="Format numbers"
          />
          <Switch
            checked={isRandomized}
            onCheckedChange={(t) => {
              setRandomized(t);
              if (t) {
                setCurrentRandomNumber(
                  randomNumberList[
                    Math.floor(Math.random() * randomNumberList.length)
                  ]
                );
              } else {
                setCurrentRandomNumber(1);
              }
            }}
            id="randomize-number"
            label="Randomize increment / decrement"
          />
        </div>
      )}
      <div className="rounded-t-lg rounded-b-[20px] bg-[#F3F3F3] flex font-medium items-center text-sm leading-5 tracking-[-0.20px]">
        <motion.button
          onClick={() =>
            setNumber((prev) => Number(prev) + currentRandomNumber)
          }
          className="p-3 flex-1 flex items-center justify-center gap-2.5 rounded-bl-[inherit]"
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 6.58579L16.4142 11L15 12.4142L13 10.4142V17H11V10.4142L9 12.4142L7.58579 11L12 6.58579Z"
              fill="#209E1D"
            />
          </svg>
          Increase
        </motion.button>
        <div className="bg-[rgba(220,_220,_220,_1)] w-px h-4"></div>
        <motion.button
          onClick={() =>
            setNumber((prev) => Number(prev) - currentRandomNumber)
          }
          className="p-3 flex-1 flex items-center justify-center gap-2.5 rounded-br-[inherit]"
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.4142L7.58579 13L9 11.5858L11 13.5858V7H13V13.5858L15 11.5858L16.4142 13L12 17.4142Z"
              fill="#E12088"
            />
          </svg>
          Decrease
        </motion.button>
      </div>
    </div>
  );
};
