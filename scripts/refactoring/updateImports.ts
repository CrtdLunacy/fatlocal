import { Project } from 'ts-morph';

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isAbsolute(value: string) {
    const layers = ['app', 'shared', 'entities', 'widgets', 'features', 'pages'];
    return layers.some((layers) => value.startsWith(layers));
}

files.forEach((srcFile) => {
    const importDeclarations = srcFile.getImportDeclarations();
    importDeclarations.forEach((declaration) => {
        const value = declaration.getModuleSpecifierValue();

        if (isAbsolute(value)) {
            declaration.setModuleSpecifier(`@/${value}`);
        }
    });
});

project.save().then(() => console.log('Done!'));
