import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";

export default function BannerPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-black hover:text-white transition">
          Book a Truck
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-2">
          <p>
            Phone : +8802-58317410, 58317412
          </p>
          <p>
            Cell : +88 01407-050600, 01678-139546
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
