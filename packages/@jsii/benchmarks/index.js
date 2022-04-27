"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Benchmark = require("benchmark");
const cp = require("child_process");
const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const util_1 = require("util");
const compiler_1 = require("jsii/lib/compiler");
const project_info_1 = require("jsii/lib/project-info");
// Always run against the same version of CDK source
const CDK_TAG = 'v2.21.1';
const exec = util_1.promisify(cp.exec);
async function setupAwsCdkLib() {
    const repoDir = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-cdk-bench'));
    await exec(`git clone -b ${CDK_TAG} https://github.com/aws/aws-cdk.git .`, {
        cwd: repoDir,
    });
    await exec('yarn', { cwd: repoDir });
    // Directory of aws-cdk-lib source
    const targetDir = path.resolve(repoDir, 'packages', 'aws-cdk-lib');
    // build all dependencies but don't build aws-cdk-lib
    await exec(`npx lerna run --include-dependencies --ignore=aws-cdk-lib build`);
    return {
        awsCdkLib: targetDir,
    };
}
void setupAwsCdkLib().then(({ awsCdkLib }) => {
    const suite = new Benchmark.Suite();
    const jsiiCalcDir = path.resolve(__dirname, '..', '..', 'jsii-calc');
    suite.add('Compile aws-cdk-lib@2.21.1', () => {
        const { projectInfo } = project_info_1.loadProjectInfo(awsCdkLib);
        const compiler = new compiler_1.Compiler({ projectInfo });
        compiler.emit();
    });
    suite.add('Compile jsii-calc', () => {
        const { projectInfo } = project_info_1.loadProjectInfo(jsiiCalcDir);
        const compiler = new compiler_1.Compiler({ projectInfo });
        compiler.emit();
    });
    suite.on('cycle', (event) => {
        console.log(String(event.target));
    });
    suite.run();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF1QztBQUN2QyxvQ0FBb0M7QUFDcEMsK0JBQStCO0FBQy9CLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsK0JBQWlDO0FBRWpDLGdEQUE2QztBQUM3Qyx3REFBd0Q7QUFFeEQsb0RBQW9EO0FBQ3BELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUMxQixNQUFNLElBQUksR0FBRyxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxLQUFLLFVBQVUsY0FBYztJQUMzQixNQUFNLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQzNFLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixPQUFPLHVDQUF1QyxFQUFFO1FBQ3pFLEdBQUcsRUFBRSxPQUFPO0tBQ2IsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFckMsa0NBQWtDO0lBQ2xDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNuRSxxREFBcUQ7SUFDckQsTUFBTSxJQUFJLENBQUMsaUVBQWlFLENBQUMsQ0FBQztJQUU5RSxPQUFPO1FBQ0wsU0FBUyxFQUFFLFNBQVM7S0FDckIsQ0FBQztBQUNKLENBQUM7QUFFRCxLQUFLLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUMzQyxNQUFNLEtBQUssR0FBRyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRXJFLEtBQUssQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO1FBQzNDLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyw4QkFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFFL0MsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBRUgsS0FBSyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7UUFDbEMsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLDhCQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUUvQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBRUgsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBCZW5jaG1hcmsgZnJvbSAnYmVuY2htYXJrJztcbmltcG9ydCAqIGFzIGNwIGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0ICogYXMgb3MgZnJvbSAnb3MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHByb21pc2lmeSB9IGZyb20gJ3V0aWwnO1xuXG5pbXBvcnQgeyBDb21waWxlciB9IGZyb20gJ2pzaWkvbGliL2NvbXBpbGVyJztcbmltcG9ydCB7IGxvYWRQcm9qZWN0SW5mbyB9IGZyb20gJ2pzaWkvbGliL3Byb2plY3QtaW5mbyc7XG5cbi8vIEFsd2F5cyBydW4gYWdhaW5zdCB0aGUgc2FtZSB2ZXJzaW9uIG9mIENESyBzb3VyY2VcbmNvbnN0IENES19UQUcgPSAndjIuMjEuMSc7XG5jb25zdCBleGVjID0gcHJvbWlzaWZ5KGNwLmV4ZWMpO1xuYXN5bmMgZnVuY3Rpb24gc2V0dXBBd3NDZGtMaWIoKTogUHJvbWlzZTx7IGF3c0Nka0xpYjogc3RyaW5nIH0+IHtcbiAgY29uc3QgcmVwb0RpciA9IGF3YWl0IGZzLm1rZHRlbXAocGF0aC5qb2luKG9zLnRtcGRpcigpLCAnanNpaS1jZGstYmVuY2gnKSk7XG4gIGF3YWl0IGV4ZWMoYGdpdCBjbG9uZSAtYiAke0NES19UQUd9IGh0dHBzOi8vZ2l0aHViLmNvbS9hd3MvYXdzLWNkay5naXQgLmAsIHtcbiAgICBjd2Q6IHJlcG9EaXIsXG4gIH0pO1xuICBhd2FpdCBleGVjKCd5YXJuJywgeyBjd2Q6IHJlcG9EaXIgfSk7XG5cbiAgLy8gRGlyZWN0b3J5IG9mIGF3cy1jZGstbGliIHNvdXJjZVxuICBjb25zdCB0YXJnZXREaXIgPSBwYXRoLnJlc29sdmUocmVwb0RpciwgJ3BhY2thZ2VzJywgJ2F3cy1jZGstbGliJyk7XG4gIC8vIGJ1aWxkIGFsbCBkZXBlbmRlbmNpZXMgYnV0IGRvbid0IGJ1aWxkIGF3cy1jZGstbGliXG4gIGF3YWl0IGV4ZWMoYG5weCBsZXJuYSBydW4gLS1pbmNsdWRlLWRlcGVuZGVuY2llcyAtLWlnbm9yZT1hd3MtY2RrLWxpYiBidWlsZGApO1xuXG4gIHJldHVybiB7XG4gICAgYXdzQ2RrTGliOiB0YXJnZXREaXIsXG4gIH07XG59XG5cbnZvaWQgc2V0dXBBd3NDZGtMaWIoKS50aGVuKCh7IGF3c0Nka0xpYiB9KSA9PiB7XG4gIGNvbnN0IHN1aXRlID0gbmV3IEJlbmNobWFyay5TdWl0ZSgpO1xuICBjb25zdCBqc2lpQ2FsY0RpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICdqc2lpLWNhbGMnKTtcblxuICBzdWl0ZS5hZGQoJ0NvbXBpbGUgYXdzLWNkay1saWJAMi4yMS4xJywgKCkgPT4ge1xuICAgIGNvbnN0IHsgcHJvamVjdEluZm8gfSA9IGxvYWRQcm9qZWN0SW5mbyhhd3NDZGtMaWIpO1xuICAgIGNvbnN0IGNvbXBpbGVyID0gbmV3IENvbXBpbGVyKHsgcHJvamVjdEluZm8gfSk7XG5cbiAgICBjb21waWxlci5lbWl0KCk7XG4gIH0pO1xuXG4gIHN1aXRlLmFkZCgnQ29tcGlsZSBqc2lpLWNhbGMnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBwcm9qZWN0SW5mbyB9ID0gbG9hZFByb2plY3RJbmZvKGpzaWlDYWxjRGlyKTtcbiAgICBjb25zdCBjb21waWxlciA9IG5ldyBDb21waWxlcih7IHByb2plY3RJbmZvIH0pO1xuXG4gICAgY29tcGlsZXIuZW1pdCgpO1xuICB9KTtcblxuICBzdWl0ZS5vbignY3ljbGUnLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFN0cmluZyhldmVudC50YXJnZXQpKTtcbiAgfSk7XG5cbiAgc3VpdGUucnVuKCk7XG59KTtcbiJdfQ==