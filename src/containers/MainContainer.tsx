import { ApplicationSelector } from "components/compartments/ApplicationSelector"
import banner from '/banner.jpg';
import { MouseActionSettings } from "components/compartments/MouseActionSettings";
import { MainActions } from "components/compartments/MainActions";
import { SystemSettings } from "components/compartments/SystemSettings";


export const MainContainer: React.FC = () =>
	<div className='flex h-screen flex-col'>
		<img draggable={false} className='w-screen' src={banner} />

		<div className='flex grow flex-col justify-between gap-2 p-3'>

			<div className='flex flex-col justify-between gap-2'>

				<ApplicationSelector />

				<MouseActionSettings />

				<SystemSettings />

			</div >

			<MainActions />

		</div>
	</div>



