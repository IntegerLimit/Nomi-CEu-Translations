import { checkModuleEnv, cleanUp, createDirs } from "./util";
import buildConfig from "../buildConfig";
import { zipOrCopyCombined } from "./compressCombinedTask";
import { zipOrCopyModule } from "./compressModulesTask";

export async function setup(): Promise<void> {
	await cleanUp(buildConfig.buildDestinationDirectory);
	await createDirs(buildConfig.buildDestinationDirectory);
}

export async function compressSpecifiedModuleTask(): Promise<void> {
	return zipOrCopySpecifiedModule(true);
}

export async function copySpecifiedModuleTask(): Promise<void> {
	return zipOrCopySpecifiedModule(false);
}

async function zipOrCopySpecifiedModule(zip: boolean) {
	if (checkModuleEnv(true) === "COMBINED") return zipOrCopyCombined(zip);
	return zipOrCopyModule(zip, process.env.MODULE.trim());
}
