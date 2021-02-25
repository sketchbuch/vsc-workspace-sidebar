import { expect } from 'chai';
import { isSelected } from '../../../../webviews/Workspace/helpers/isSelected';

suite('Webviews > Workspace > isSelected():', () => {
  test('Correctly detects a selected Workspace', () => {
    expect(isSelected('/file/react', '/file/react', 'lin')).to.eql(true);
  });

  test('Correctly detects an unselected Workspace', () => {
    expect(isSelected('/file/dart', '/file/flutter', 'lin')).to.eql(false);
  });

  suite('Windows Drive Letter Case Tests', () => {
    test('Correctly detects a selected Workspace (Windows)', () => {
      expect(isSelected('C:\file\react', 'c:\file\react', 'win32')).to.eql(true);
    });

    test('Correctly detects an unselected Workspace (Windows)', () => {
      expect(isSelected('C:\filedart', 'c:\file\flutter', 'win32')).to.eql(false);
    });
  });
});
