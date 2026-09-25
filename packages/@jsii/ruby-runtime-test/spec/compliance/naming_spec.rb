# frozen_string_literal: true

require 'spec_helper'

# Suite tests: reservedKeywordsAreSlugifiedIn{ClassProperties,MethodNames,
# StructProperties}, liftedKwargWithSameNameAsPositionalArg.
#
# Code-generation name mangling.  TS members named `int`, `import`,
# `return`, `assert`, `default`, ... must be reachable from Ruby — slugified
# (e.g. `_return`) where they would otherwise be syntax errors or shadow
# runtime-critical methods (see Jsii::Utils.ruby_member_name).
# liftedKwargWithSameNameAsPositionalArg covers the trailing-struct
# "lifting" convention: when a struct parameter is expanded into keyword
# args and one keyword (scope:) collides with a positional parameter's name,
# both must still land in the right slot on the wire.
RSpec.describe 'JSII compliance: naming and reserved words' do
  it 'slugifies reserved words used as class property names', compliance: 'reservedKeywordsAreSlugifiedInClassProperties' do
    obj = JsiiCalc::ClassWithJavaReservedWords.new('one')
    expect(obj.int).to eq('one')
    expect(obj.import('two')).to eq('onetwo')
  end

  it 'slugifies reserved words used as method names', compliance: 'reservedKeywordsAreSlugifiedInMethodNames' do
    obj = JsiiCalc::PythonReservedWords.new
    obj.import
    obj._return
  end

  it 'slugifies reserved words used as struct property names', compliance: 'reservedKeywordsAreSlugifiedInStructProperties' do
    struct = JsiiCalc::StructWithJavaReservedWords.new(
      assert: 'one',
      default: 'two'
    )
    expect(struct.assert).to eq('one')
    expect(struct.default).to eq('two')
  end

  it 'lifts kwargs sharing a name with a positional argument', compliance: 'liftedKwargWithSameNameAsPositionalArg' do
    bell = JsiiCalc::Bell.new
    amb = JsiiCalc::AmbiguousParameters.new(bell, scope: 'Driiiing!')

    expect(amb.scope).to eq(bell)
    # Assuming struct equality works
    expect(amb.props).to eq(JsiiCalc::StructParameterType.new(scope: 'Driiiing!'))
  end

  describe 'naming (extended)' do
    it 'handles parameters named self' do
      subject = JsiiCalc::PythonSelf::ClassWithSelf.new('Howdy!')
      expect(subject.self).to eq('Howdy!')
      expect(subject.method(1337)).to eq('1337')
    end

    it 'can override methods whose names are reserved words elsewhere' do
      class RubyReservedWords < JsiiCalc::JavaReservedWords
        # In Ruby, 'while' is a keyword. Our generator mapped it to '_while'.
        # Let's see if we can override 'abstract' which is a method.
        def abstract
          "Overridden abstract"
        end
      end

      obj = RubyReservedWords.new
      expect(obj.abstract).to eq("Overridden abstract")
    end

    it 'lifts kwargs declared on a superinterface' do
      expect(JsiiCalc::Submodule::Isolated::Kwargs.method(extra: 'ordinary', prop: JsiiCalc::Submodule::Child::SomeEnum::SOME)).to be_truthy
    end
  end
end
