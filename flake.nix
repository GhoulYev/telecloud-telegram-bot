{
    description = "Telecloud Developer Shell";

    inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    inputs.flake-utils.url = "github:numtide/flake-utils";

    outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
        let
            pkgs = nixpkgs.legacyPackages.${system};
        in {
            devShells.default = pkgs.mkShell {
                nativeBuildInputs = with pkgs; [ nodejs yarn nodePackages.ts-node ];
                shellHook = ''
                    export PATH=$PATH:$PWD/node_modules/.bin
                '';
            };
        }
    );
}