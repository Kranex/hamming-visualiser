{ pkgs ? import <nixpkgs> {}}:

with pkgs;
pkgs.mkShell rec {
  propagatedBuildInputs = [
    nodejs
  ];
}
