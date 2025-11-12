import { NextRequest, NextResponse } from 'next/server';
import { SpecificationParser } from '@/lib/parser';
import { SiteGenerator } from '@/lib/generator';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { description, businessType, targetAudience } = await request.json();

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // Parse specification
    const parser = new SpecificationParser();
    const spec = await parser.parse({
      description,
      businessType,
      targetAudience,
    });

    // Generate site
    const outputDir = path.join(process.cwd(), 'generated');
    const generator = new SiteGenerator(outputDir);
    const projectPath = await generator.generate(spec);

    return NextResponse.json({
      success: true,
      spec,
      projectPath,
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate landing page', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
